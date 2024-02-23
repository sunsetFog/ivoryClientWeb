import {getCookie, setCookie} from 'sunny-js';

export const setCookies = (key: string, value: any, option?: any) => {
    try {
        setCookie(key, value, option);
        if (typeof document !== 'undefined') {
            localStorage.setItem(key, value);
        }
    } catch (e) {
        console.log('cookie设置失败：' + e);
    }
};

export const getCookies = (key: string, options?: any) => {
    try {
        return getCookie(key, options) || localStorage.getItem(key);
    } catch (e) {
        return '';
    }
};
