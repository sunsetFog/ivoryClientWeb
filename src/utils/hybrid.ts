import {useNavigate} from 'react-router-dom';

// utils
import {isAndroid, isIos} from '@/utils/device';
import {isBrowser} from '@/utils/detect';

const navigate = useNavigate();

//  判断是否是App调用的H5页面
//  只适用于useLayoutEffect之后获取,建议使用hook useIsApp/useAppData
export function getIsApp() {
    try {
        return getAppData()?.isApp;
    } catch (e) {
        return false;
    }
}

//  判断是否是体育
export function getIsSport() {
    try {
        return getAppData()?.isSport;
    } catch (e) {
        return false;
    }
}

/**
 * 关闭webview页面返回app页面
 */
export function gotoAppBack() {
    if (!getIsApp()) {
        return navigate('about');
    }
    if (isAndroid()) {
        return (window as any).nativeMethod.gotoCloseWebView();
    }
    if (isIos()) {
        return (window as any).webkit.messageHandlers.gotoCloseWebView.postMessage('gotoCloseWebView');
    }
}

// 获取app进入数据
export function getAppData() {
    try {
        return JSON.parse(sessionStorage.getItem('app') as any);
    } catch (e) {
        return null;
    }
}

export function toAppLogin() {
    if (isAndroid()) {
        (window as any).nativeMethod.gotoLogin();
    }
    if (isIos()) {
        (window as any).webkit.messageHandlers.gotoLogin.postMessage('toLogin');
    }
}

// 去存款
export function handleToDeposit() {
    if (!getIsApp()) {
        return navigate('/about');
    }
    if (isAndroid()) {
        return (window as any).nativeMethod.goDepositNew();
    }
    if (isIos()) {
        // (window as any).location.href = 'deposit://';
        (window as any).open('deposit://');
        return null;
    }
}

/**
 * 问题背景，url访问被劫持
 * 告诉用户是不是我们自己的web页
 * 交互形式，弹窗消息提示
 */
export function handleWebSafe(url = '') {
    try {
        if (isIos()) {
            (window as any).webkit.messageHandlers.webSafeHandle.postMessage(url);
            return;
        }
        if (isAndroid()) {
            (window as any).nativeMethod.webSafeHandle(url);
            return;
        }
    } catch (e) {}
}

// 调用App方法告诉当前的页面，App点击需要能返回上一页
export function handleNativeBack(status = true) {
    try {
        if (!getIsApp()) {
            return;
        }
        if (isIos()) {
            (window as any).webkit.messageHandlers.callGoBack.postMessage(status);
            return;
        }
        if (isAndroid()) {
            (window as any).nativeMethod.callGoBack(status);
            return;
        }
    } catch (e) {}
}

/**
 * 调用App方法告诉App 接下来访问的地址需要能返回上一页
 */
export function goOtherWebPage(webUrl: string, title = '客服') {
    try {
        if (getIsApp() && webUrl) {
            webUrl = encodeURI(webUrl);
            if (isIos()) {
                (window as any).webkit.messageHandlers.goOtherWebPage.postMessage(JSON.stringify({webUrl, title}));
            } else {
                (window as any).nativeMethod.goOtherWebPage(JSON.stringify({webUrl, title}));
            }
        }
    } catch (e) {
        //
    }
}

/**
 * 调用App方法告诉App 需要webView立即返回上一页
 */
export function needGoBackToPreview() {
    try {
        if (getIsApp()) {
            if (isIos()) {
                (window as any).webkit.messageHandlers.needGoBackToPreview.postMessage(true);
            } else {
                (window as any).nativeMethod.needGoBackToPreview(true);
            }
        }
    } catch (e) {
        //
    }
}

/**
 * 调用App方法告诉App 接下来访问的地址需要能返回上一页
 */
export function gotoWeb(url: string) {
    try {
        if (getIsApp() && url) {
            if (isIos()) {
                (window as any).webkit.messageHandlers.gotoWeb.postMessage(url); // 这里因为IOS不能处理中文需要先转码再发送
            } else {
                (window as any).nativeMethod.gotoWeb(url);
            }
        }
    } catch (e) {
        //
    }
}

/**
 * 调用App方法告诉App 修改其标题
 */
export function changeAppTitle(title: string) {
    try {
        if (getIsApp()) {
            isIos()
                ? (window as any).webkit.messageHandlers.callChangeTitle.postMessage(title)
                : (window as any).nativeMethod.callChangeTitle(title);
        }
    } catch (e) {
        //
    }
}

// 嵌入App时不需要跳转到外部的 类型 ,
export const needToGotoWeb = (type: number) => {
    const noNeedToGoWeb = [33, 34, 35, 36, 37, 38, 39, 1111].find((item) => {
        return Number(item) === Number(type);
    });
    return !!!noNeedToGoWeb;
};
// App点击浮窗跳转福利中心时
export const openBoonCenterInApp = () => {
    if (isIos()) {
        (window as any).webkit.messageHandlers.openBoonCenterInApp.postMessage(true);
    }
    if (isAndroid()) {
        (window as any).nativeMethod.openBoonCenterInApp(true);
    }
};

const _isAppFromURL = isBrowser() && new URLSearchParams(window.location.search).get('isApp');

/**
 * 是否内嵌在公司内部APP中
 */
export function isApp() {
    return !!_isAppFromURL || (isBrowser() && !!/kkbridge/i.test(window.navigator.userAgent));
}
