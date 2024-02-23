import {AjaxCancelError, BusinessError, ConnectionError, trimEnd, trimStart} from 'sunny-js';
import {errorHandler, replaceErrorMessage} from './errorHandler';
import {isBrowser} from '@/utils/detect';
import {replaceTextByPairs} from '@/utils/string';
import {Events} from '@/utils/eventProxy';
import {sharedHeaders} from './sharedHeaders';
// import Toast from '@/components/toast';
export interface ResponseData<TData = any> {
    status_code: number;
    code: number | string;
    data: TData;
    message: string;
}

function withBaseUrl(url: string): string {
    const separator = '/';
    if (/^https?/.test(url)) {
        return url;
    } else {
        return [
            trimEnd(isBrowser() ? '' : process.env.REACT_APP_API_BASE_URL, separator),
            separator,
            trimStart(url, separator)
        ].join('');
    }
}

type FetchOptions = {
    url: string;
    timeout?: number;
    // 重连次数
    reconnectCount?: number;
    /**
     * 对接口响应数据结构提供转换能力
     */
    transformResponse?: (data: ResponseData) => any;
    allowTransformResponse?: (data: ResponseData) => boolean;
    replaceTextFun?: (text: string, replacementPairs: Array<string[]>) => any;
    noToast?: boolean;
    _res?: boolean;
    signal?: any;
    noTextReplace?: boolean;
    blob?: boolean;
    withCredentials?: boolean;
    wType?: number;
    needVisitToken?: boolean;
} & RequestInit;

export async function normalizeFetchOptions(params: string | FetchOptions): Promise<FetchOptions> {
    let _url: string;
    let _params: RequestInit;
    if (typeof params === 'string') {
        _url = withBaseUrl(params);
        _params = {
            headers: (await sharedHeaders(params)) as any
        };
    } else {
        let {url, ...rest} = params;
        if (rest.headers instanceof Headers) {
            const customHeaders = {} as Record<string, any>;
            rest.headers.forEach((v, k) => (customHeaders[k] = v));
            rest.headers = Object.assign(await sharedHeaders(url, params?.blob, params?.needVisitToken), customHeaders);
        } else {
            rest.headers = Object.assign(await sharedHeaders(url, params?.blob, params?.needVisitToken), rest.headers);
        }
        _url = withBaseUrl(url);
        _params = {...rest};
    }

    return {
        url: _url,
        ..._params
    };
}

/**
 * fetch代理函数
 * 用来接管共用异常处理逻辑
 */
export async function fetchProxy<TResponse = Response | ResponseData>(
    params: string | FetchOptions
): Promise<TResponse> {
    let {
        url: _url,
        transformResponse = (data) => data.data, // 默认结构转换逻辑
        allowTransformResponse = (data) => data.status_code === 6000 || data.status_code === 200 || data.code == '200', // 默认响应成功状态转换逻辑
        replaceTextFun = replaceTextByPairs,
        noTextReplace,
        ..._params
    } = await normalizeFetchOptions(params);
    // 请求超时处理
    let timeout = 20000;
    let isTimeout = false;
    if (typeof params === 'object') {
        timeout = params.timeout || timeout;
    }
    // @ts-ignore
    const controller = new AbortController() as any;
    const ajaxTimeoutId = setTimeout(() => {
        isTimeout = true;
        controller.abort();
    }, timeout);
    _params.signal = _params.signal || controller.signal;
    _params.noToast = _params.noToast || false;

    // end

    // console.debug('request', _url, { ..._params });
    //_params 添加 _res 参数自定义处理返回逻辑
    // const _res = _params?._res;
    // delete _params?._res;
    return fetch(_url, _params)
        .then<any>((response: Response) => {
            if (!response?.ok) {
                throw new ConnectionError({
                    status: response?.status,
                    message: replaceErrorMessage(response?.statusText)
                });
            }
            const contentType = response.headers.get('content-type');
            console.log('--contentType--', contentType);

            if (contentType?.includes('application/json') || /^\/proxy/.test(_url)) {
                let parsedResponse: Promise<ResponseData>;
                let env_replacement_pairs = process.env.REACT_APP_TEXT_REPLACEMENT_PAIRS;
                if (noTextReplace || /^\/proxy/.test(_url)) {
                    // 禁用字符串替换逻辑
                    env_replacement_pairs = undefined;
                }

                try {
                    // 如果设置了环境变量 REACT_APP_TEXT_REPLACEMENT_PAIRS，附加替换逻辑
                    const replacementPairs = JSON.parse(env_replacement_pairs as string);

                    parsedResponse = response.text().then((text) => JSON.parse(replaceTextFun(text, replacementPairs)));
                } catch (e) {
                    // 没有设置环境变量REACT_APP_TEXT_REPLACEMENT_PAIRS，使用默认逻辑
                    parsedResponse = response.json();
                }

                return parsedResponse.then((data: ResponseData) => {
                    // console.debug('response', response, 'data', data);
                    let _data = data;

                    let isSuccess = allowTransformResponse(data);

                    // sport

                    if (isSuccess) {
                        //end
                        /**
                         * @example
                         * get('/url').then(data => console.log(data.name))
                         */
                        return transformResponse(_data);
                    }

                    if (Number(data.status_code) === 6013) {
                        Events.trigger('response_6013'); // 维护信息
                    }
                    if (Number(data.status_code) === 6001) {
                        Events.trigger('response_6001'); // 登陆失效
                    }

                    if (!_params.noToast && isBrowser()) {
                        // if (data?.message) Toast.error(data.message);
                    }
                    console.log('系统异常_url：', _url);

                    return Promise.reject(new BusinessError(data.status_code, replaceErrorMessage(data.message), data));
                });
            }
            return Promise.resolve(response);
        })
        .catch((error) => {
            if (error.name && error.name.toLowerCase().includes('abort')) {
                error = isTimeout
                    ? new ConnectionError({status: 0, message: 'timeout'}) // 超时异常
                    : new AjaxCancelError(); // 请求被取消异常
            }
            let isNeedReplace = false;
            const abnormalErrors = ['Acceptable', 'Failed', '发生了SSL错误', 'Forbidden'];
            abnormalErrors.forEach((item) => {
                if ((error.message || '').toLowerCase().indexOf(item.toLowerCase()) !== -1) {
                    isNeedReplace = true;
                }
            });
            if (isNeedReplace) {
                error = new Error('网络异常,请您稍后重试');
            }
            errorHandler(error);
            return Promise.reject(error);
        })
        .finally(() => {
            clearTimeout(ajaxTimeoutId);
        });
}

function _enhanceGetParams(url: string, options: any) {
    let _getUrl: string = url;

    if (!url.includes('?') && options.body) {
        const _body = JSON.parse(options.body as any);

        let _params = '?';

        for (let item in _body) {
            _params += `${item}=${encodeURIComponent(_body[item])}&`;
        }
        _getUrl += _params.substring(0, _params.length - 1);
    }
    delete options.body;
    return _getUrl;
}

export function get<TResponse>(url: string, options: Omit<FetchOptions, 'url'> = {}) {
    const _url: string = _enhanceGetParams(url, options);
    return fetchProxy<TResponse>({url: _url, ...options, method: 'get'});
}

export function post<TResponse>(url: string, options: Omit<FetchOptions, 'url'> = {}) {
    return fetchProxy<TResponse>({url, ...options, method: 'post'});
}

export function put<TResponse>(url: string, options: Omit<FetchOptions, 'url'> = {}) {
    return fetchProxy<TResponse>({url, ...options, method: 'put'});
}

export function del<TResponse>(url: string, options: Omit<FetchOptions, 'url'> = {}) {
    return fetchProxy<TResponse>({url, ...options, method: 'delete'});
}

/**
 * 重新封装重连机制
 */
export function postByReconnect(url: string, options: Omit<FetchOptions, 'url'> = {}) {
    let reconnectCount = options.reconnectCount || 1;
    return new Promise((resolve, reject) => {
        const tryReconnect = async () => {
            try {
                const res = await fetchProxy({url, ...options, method: 'post'});
                resolve(res);
            } catch (e) {
                if (reconnectCount > 1) {
                    reconnectCount--;
                    tryReconnect();
                } else {
                    reject(e);
                }
            }
        };
        tryReconnect();
    });
}
