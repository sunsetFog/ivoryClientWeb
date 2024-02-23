import {isBrowser} from '@/utils/detect';
import {LocalUserToken} from '@/utils/utils_token';

export const _tokenFromURL = isBrowser() && new URLSearchParams(window.location.search).get('token');

export function isJudge(value: any) {
    return (trued: any, falsed?: any) => {
        if (value) {
            return trued;
        } else {
            return falsed;
        }
    };
}

/**
 * 格式化银行卡号
 * @param str
 */
export function formatCardNo(str: string) {
    if (!str) {
        return '';
    }
    return str.split('').reduce((prev, currVal, currIndex) => {
        prev += currIndex % 4 === 0 && currIndex !== 0 ? ` ${currVal}` : currVal;
        return prev;
    }, '');
}

/**
 * 去掉地址的 | 线
 * @param str
 */
export function formatAddress(str: string) {
    if (!str) {
        return '';
    }
    return str.replace(/\|/g, '');
}
/**
 * @param  {string} ...className
 * 解构react的className数组
 */
export function reactClassNameJoin(...className: any) {
    return className.join(' ');
}

// 单独获取 getSessionUserInfo
export function getSessionUserId() {
    if (!isBrowser()) return '';
    const userInfoSession = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') as any) : '';

    return userInfoSession?.id || null;
}

/**
 * 判断用户是否登录
 */
export const isLogin = () => {
    return LocalUserToken.getToken();
};

export const token = () => {
    return _tokenFromURL || LocalUserToken.getToken();
};

// 保留两位小数，不足两位自动补0
export function dealNum(val: any) {
    let value: any = Math.round(parseFloat(val) * 100) / 100;
    let s = value.toString().split('.');
    if (s.length == 1) {
        value = value.toString() + '.00';
        return value;
    }
    if (s.length > 1) {
        if (s[1].length < 2) {
            value = value.toString() + '0';
        }
        return value;
    }
}

export const numberToString = (number: string) => {
    if (number.match(/\D/) || number.length >= 14) return;
    let zhArray = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']; // 数字对应中文
    let baseArray = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万']; //进位填充字符，第一位是 个位，可省略
    let string = String(number)
        .split('')
        .reverse()
        .map((item, index) => {
            // 把数字切割成数组并倒序排列，然后进行遍历转成中文
            // 如果当前位为0，直接输出数字， 否则输出 数字 + 进位填充字符
            item = Number(item) == 0 ? zhArray[Number(item)] : zhArray[Number(item)] + baseArray[index];
            return item;
        })
        .reverse()
        .join(''); // 倒叙回来数组，拼接成字符串
    string = string.replace(/^一十/, '十'); // 如果以 一十 开头，可省略一
    string = string.replace(/零+/, '零'); // 如果有多位相邻的零，只写一个即可
    return string;
};

/**
 * 获取url参数
 * @param {String} paraName
 */
export const getUrlParams = (paraName: string) => {
    let url = '';
    try {
        url = document.location.toString();
    } catch (error) {
        //
    }
    const arrObj = url.split('?');
    if (arrObj.length > 1) {
        const arrPara = arrObj[1].split('&');
        let arr: any;
        let inviteArr: any;
        const index = arrPara[0]?.indexOf('=');
        for (let i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split('=');
            inviteArr = arrPara[i].substring(index + 1);
            if (arr != null && arr[0] === paraName) {
                if (paraName === 'invite_code') {
                    return inviteArr;
                }
                return arr[1];
            }
        }
        return '';
    } else {
        return '';
    }
};
