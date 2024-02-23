/**
 * 获取重定向前的链接，防止url访问劫持
 */
export function getReferrerURL(referrerKey = 'referrer'): string {
    const _url = new URLSearchParams(location.search);
    let _referer = _url.get(referrerKey);
    if (_referer) {
        return location.origin + _referer;
    } else {
        return document.referrer;
    }
}

export function getUrlParam(): any {
    const url = decodeURI(window.location.href);
    const thisParam = new Object();
    // 判断是否存在请求的参数
    if (url.indexOf('?') !== -1) {
        const str = url.split('?')[1];
        // 截取所有请求的参数，以数组方式保存
        const strs = str.split('&');
        for (let i = 0; i < strs.length; i++) {
            // 获取该参数名称，值。其中值以unescape()方法解码，有些参数会加密
            // @ts-ignore
            thisParam[strs[i].split('=')[0]] = strs[i].split('=')[1];
        }
    }
    // 返回改参数列表对象
    return thisParam;
}
