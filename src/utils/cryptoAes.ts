/*
AES和DES属于对称加密，加密和解密使用同一个密钥
*/
import encBase64 from 'crypto-js/enc-base64';
import encHex from 'crypto-js/enc-hex';
import encUtf8 from 'crypto-js/enc-utf8';
import {encrypt as AESEncrypt, decrypt as AESDecrypt} from 'crypto-js/aes';

// 秘钥key>=16位
// console.log('process', process);

const keyHex = encUtf8.parse(process.env.REACT_APP_GUEST_AES_KEY as string); // 将秘钥转化为utf8格式
const iv = encUtf8.parse(process.env.REACT_APP_GUEST_AES_IV as string); // 编译向量，可以和key一致

/*
生成唯一id
*/
export const uuid = (lowercase = false) => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: any) => {
        const r = (Math.random() * 16) | 0;
        const result = (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
        return lowercase ? result : result.toUpperCase();
    });
};
/*
生成n位随机数
*/
export const generateRandom = (n: number) => {
    let num = '';
    for (let i = 0; i < n; i++) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
};

/*
解密
*/
export const Decrypt = (data: any) => {
    const encryptedHexStr = encHex.parse(data);
    const srcs = encBase64.stringify(encryptedHexStr);
    const decrppt = AESDecrypt(srcs, keyHex, {
        iv
        // mode: CryptoJS.mode.CBC,
        // padding: CryptoJS.pad.Pkcs7,
    });
    const decryptStr = decrppt.toString(encUtf8);
    return decryptStr.toString();
};
/*
加密
*/
export const Encrypt = (data: string | number) => {
    const encrypted = AESEncrypt(JSON.stringify(data), keyHex, {
        iv
        // mode: CryptoJS.mode.CBC,
        // padding: CryptoJS.pad.Pkcs7,
    });
    // return CryptoJS.enc.Base64.stringify(encrypted.ciphertext); // base64,看场景需不需要
    return encrypted.ciphertext.toString().toUpperCase();
};

/**
 * 针财务一些接口字段加密
 * @param text
 */
export function encryptForFinanceKeyValue(text: string) {
    const secretPhrase = 'nZr4u7x!A%D*G-Ka';
    const secretIv = 'PeShVmYq3t6w9z$B';

    if (!text) {
        return '';
    }

    const key = encUtf8.parse(secretPhrase);
    const _iv = encUtf8.parse(secretIv);
    const textCode = encUtf8.parse(text);
    const code = AESEncrypt(textCode, key, {
        iv: _iv
        // mode: CryptoJS.mode.CBC,
        // padding: CryptoJS.pad.Pkcs7,
    });
    return encBase64.stringify(code.ciphertext).toString();
}

/**
 * 针主站一些接口字段加密
 * @param text
 */
export function encryptForMainKeyValue(text: string) {
    const secretPhrase = 'xzaNI7snBdRFa2MLPDaK1duMTx89vaqc';
    const secretIv = 'mltqgzVTJLGSS2TQ';

    if (!text) {
        return '';
    }

    const key = encUtf8.parse(secretPhrase);
    const _iv = encUtf8.parse(secretIv);
    const textCode = encUtf8.parse(text);
    const code = AESEncrypt(textCode, key, {
        iv: _iv
        // mode: CryptoJS.mode.CBC,
        // padding: CryptoJS.pad.Pkcs7,
    });
    return encBase64.stringify(code.ciphertext).toString();
}

export function decrypt(encryptedText: string, secret?: string): string {
    return AESDecrypt(encryptedText, secret || '').toString(encUtf8);
}
