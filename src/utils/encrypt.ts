// crypto-js
const MD5 = require('crypto-js/md5');
const encBase64 = require('crypto-js/enc-base64');
const _enc_utf8 = require('crypto-js/enc-utf8');
const _aes = require('crypto-js/aes');
const encUtf8Parse = _enc_utf8.parse;
const AESEncrypt = _aes.encrypt;
// md5 用户密码加密
const md5Encrypt = (word: string) => {
    let _encrypt = String(word).toLowerCase();
    return MD5(_encrypt).toString();
};

// base64加密
function base64Pkcs7Encrypt(text: string) {
    const secretPhrase = 'xzaNI7snBdRFa2MLPDaK1duMTx89vaqc';
    const secretIv = 'mltqgzVTJLGSS2TQ';
    if (!text) {
        return text;
    }
    const key = encUtf8Parse(secretPhrase);
    const iv = encUtf8Parse(secretIv);
    const textCode = encUtf8Parse(text);
    const code = AESEncrypt(textCode, key, {
        iv
    });
    return encBase64.stringify(code.ciphertext);
}

// 获取签名
function getSign(name: string, code: string) {
    name = name.toLowerCase();
    code = code.toLowerCase();
    const key = encUtf8Parse(MD5(code).toString().slice(0, 16));
    const iv = encUtf8Parse(MD5(name).toString().slice(-16));
    return AESEncrypt(name, key, {
        iv
    }).ciphertext.toString();
}

function pkcs7Encrypt(text: string) {
    const secretPhrase = 'xzaNI7snBdRFa2MLPDaK1duMTx89vaqc';
    const secretIv = 'mltqgzVTJLGSS2TQ';
    if (!text) {
        return text;
    }
    const key = encUtf8Parse(secretPhrase);
    const iv = encUtf8Parse(secretIv);
    const code = AESEncrypt(text, key, {
        iv
    });
    return code.ciphertext.toString();
}

function encrypt(plainText: string, secret?: string): string {
    return AESEncrypt(plainText, secret || '').toString();
}

module.exports = {
    encrypt,
    pkcs7Encrypt,
    getSign,
    base64Pkcs7Encrypt,
    md5Encrypt
};
