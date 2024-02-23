import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';
import pkcs7 from 'crypto-js/pad-pkcs7';

// noinspection SpellCheckingInspection
const secretPhrase = 'V=GO`(h$/?17adye';

// 解密方法
export function decrypt(text: string) {
    if (!text) {
        return text;
    }
    const key = encUtf8.parse(secretPhrase);
    const iv = encUtf8.parse(secretPhrase);

    return AES.decrypt(text, key, {
        iv,
        padding: pkcs7
    }).toString(encUtf8);
}

// 加密方法
export function encrypt(text: string) {
    if (!text) {
        return text;
    }
    const key = encUtf8.parse(secretPhrase);
    const iv = encUtf8.parse(secretPhrase);
    return AES.encrypt(text, key, {
        iv,
        padding: pkcs7
    }).toString();
}

// 登录表单
export class LocalSignInForm {
    static key = 'signIn/form';

    // 设置
    static getSignInForm() {
        try {
            const result = JSON.parse(
                decrypt(sessionStorage.getItem(this.key) || localStorage.getItem(this.key) || '{}')
            );
            // 在登录页面，保存密码不存在，删除密码返回
            if (!result.checked) {
                return {...result, password: ''};
            }
            // 保存密码存在
            return result;
        } catch (e) {
            return {};
        }
    }

    // 获取
    static setSignInForm({name, password, checked}: any) {
        try {
            localStorage.setItem(this.key, encrypt(JSON.stringify({name, password, checked})));
            sessionStorage.setItem(this.key, encrypt(JSON.stringify({name, password, checked})));
        } catch (e) {
            //
        }
    }

    // 移除
    static removeSignInForm() {
        sessionStorage.removeItem(this.key);
        return localStorage.removeItem(this.key);
    }
}

// 用户信息
export class LocalUserInfo {
    static key = 'auth/userInfo';

    // 设置
    static getUserInfo() {
        try {
            return JSON.parse(decrypt(sessionStorage.getItem(this.key) || localStorage.getItem(this.key) || '{}'));
        } catch (e) {
            return {};
        }
    }

    // 获取
    static setUserInfo(data: any) {
        try {
            localStorage.setItem(this.key, encrypt(JSON.stringify(data)));
            sessionStorage.setItem(this.key, encrypt(JSON.stringify(data)));
        } catch (e) {
            //
        }
    }

    // 移除
    static removeUserInfo() {
        sessionStorage.removeItem(this.key);
        return localStorage.removeItem(this.key);
    }
}

// 用户token
class LocalToken {
    key = '';
    constructor(key: string) {
        this.key = key;
    }

    // 设置
    getToken() {
        try {
            return sessionStorage.getItem(this.key) || localStorage.getItem(this.key) || '';
        } catch (e) {
            return '';
        }
    }
    // 获取
    setToken(token: string) {
        try {
            localStorage.setItem(this.key, token);
            sessionStorage.setItem(this.key, token);
        } catch (e) {
            //
        }
    }
    // 移除
    removeToken() {
        sessionStorage.removeItem(this.key);
        localStorage.removeItem(this.key);
        return;
    }
}

// 用户token
export const LocalUserToken = new LocalToken('auth/token');
// 访客token
export const LocalGuestToken = new LocalToken('auth/visitToken');
