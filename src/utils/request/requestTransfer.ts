import AES from 'crypto-js/aes';
import enc_utf8 from 'crypto-js/enc-utf8';
import pkcs7 from 'crypto-js/pad-pkcs7';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import { getSessionUserId } from '@/utils/helpers';
import { getUUID } from '@/utils/fingerprint';
import { LocalGuestToken } from '@/utils/utils_token';

export function getVisitHeaders(): any {
    const userToken = LocalGuestToken.getToken();
    if (userToken) {
        return {
            'X-API-TOKEN': userToken,
            needVisitToken: true,
        };
    }
    return {};
}

/**
 * XHR的方式提交formData
 * @param {string} params.url 请求地址
 * @param {formDate} params.data formDate格式
 * @param {function} params.success 成功的回调
 */
export function createXHRPost(params: any) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                params.success(JSON.parse(xhr.responseText));
            } else {
                params.error(xhr.response);
            }
        }
    };
    xhr.open('POST', params.url, true);
    xhr.setRequestHeader('client-type', 'h5');
    xhr.setRequestHeader('X-API-TOKEN', 'token');
    xhr.setRequestHeader('X-API-ID', getSessionUserId());
    xhr.setRequestHeader('X-API-UUID', getUUID());
    xhr.send(params.data);
}

/** 以最近优先级原则，将目前测试头部逻辑，和请求方法库放在一起
 *  不在工具库中单独定义，后期可能会全部接口都需要加上
 * */
const APP_KEY = 'k49cv8esobmpvdx67u';
const APP_SECRET = '7xs15slglcernpuuj9l8xtaxfdr99hxo';

// 将slice(0, 16)复杂化
function getAppRealSecret() {
    return APP_SECRET.split('')
        .reverse()
        .reduceRight((prev, curr, index) => {
            if (APP_SECRET.length - index > 16) {
                return prev;
            }
            prev += curr;
            return prev;
        }, '');
}

const APP_DATA_SECRET_KEY = enc_utf8.parse(getAppRealSecret());
const APP_SIGN_SECRET_KEY = enc_utf8.parse(APP_SECRET);

const letterList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');

function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandom(num = 11) {
    return Array.from(Array(num))
        .map(() => letterList[getRandomInt(61)])
        .join('');
}

export function getSecretHeader() {
    return { 'X-YB-APPKEY': APP_KEY, 'X-YB-PEIV': getRandom(16) };
}

function getSecretMap() {
    const map = {
        appKey: APP_KEY,
        nonce_str: getRandom(11),
        timestamp: parseInt(String(+new Date() / 1000), 10),
    };
    const result = Object.keys(map)
        .sort()
        .reduce((prev, curr) => {
            // @ts-ignore
            prev[curr] = map[curr];
            return prev;
        }, {});
    return {
        map,
        stringDataTemp: JSON.stringify(result),
        stringSignTemp: `${Object.keys(result)
            // @ts-ignore
            .map((key) => `${key}=${result[key]}`)
            .join('&')}&key=${APP_SECRET}`,
    };
}

function encodeData(stringDataTemp: any, iv: any) {
    const aesRes = AES.encrypt(stringDataTemp, APP_DATA_SECRET_KEY, {
        iv: enc_utf8.parse(iv),
        // mode: CryptoJS.mode.CBC, // mode默认为CBC
        padding: pkcs7,
    });
    return aesRes.toString();
}

function encodeSign(stringSignTemp: any) {
    return HmacSHA256(stringSignTemp, APP_SIGN_SECRET_KEY).toString().toUpperCase();
}

export function getSecretParams(iv: any) {
    const { map, stringDataTemp, stringSignTemp } = getSecretMap();
    return {
        ...map,
        sign: encodeSign(stringSignTemp),
        data: encodeData(stringDataTemp, iv),
    };
}
