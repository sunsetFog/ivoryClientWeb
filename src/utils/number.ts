import {floor} from 'lodash-es';

export const priceSwitch = (money: string | number) => {
    const spArr: Array<string> = parseFloat(String(money)).toFixed(3).slice(0, -1).split('.');
    const num = spArr[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    return `${num}.${spArr[1]}`;
};
/**
 * 返回千分位隔符数字
 */
export function numSeparatorFormat(num: any, decimal?: number) {
    if (typeof num === 'string' && num.indexOf(',') !== -1) {
        return numSeparatorFormatVip(num);
    }

    if (isNaN(num) || num === undefined || num === null) {
        return '';
    }
    if (num === 0) {
        return '0.00';
    }
    if (!num) {
        return num;
    }
    let res = decimal ? num.toFixed(decimal) : num.toString();
    res = res.replace(/\d+/, (n: any) => {
        // 先提取整数部分
        return n.replace(/(\d)(?=(\d{3})+$)/g, ($1: any) => {
            return $1 + ',';
        });
    });
    return res;
}

/**
 * 返回千位分隔符数字
 * @param {Number} money
 */

export function numSeparatorFormatVip(money: string) {
    money = String(money);
    const res = money.replace(/\d+/, (n) => {
        // 先提取整数部分
        return n.replace(/(\d)(?=(\d{3})+$)/g, ($1) => {
            return $1 + ',';
        });
    });
    return /\./g.test(res) ? res : `${res}.00`;
}

export function toString(data: Array<string | number> | string) {
    if (Array.isArray(data)) {
        if (!data.length) {
            return data;
        }
        return data.map((item) => String(!item && item !== 0 ? '' : item));
    }
    // @ts-ignore
    return String(!data && data !== 0 ? '' : data);
}

// /**
//  * 数字转小数 不四舍五入
//  * 5 => 5.0000  5.23 => 5.2300  5.45683 => 5.4568
//  * @param a 源数字
//  * @param num 保留位数
//  */
export function subStringNum(a: number | string, num: any) {
    const [left, right] = String(a).split('.');

    const r = String(right);
    if (right === undefined || !r.length) {
        return left + '.' + new Array(num).fill(0).join('');
    } else {
        if (r.length >= num) {
            return left + '.' + r.substr(0, num);
        } else {
            return left + '.' + r + '' + new Array(num - r.length).fill(0).join('');
        }
    }
}

// /**
//  * 不足n位小数的补齐
//  */
export function addNumber(val: string, n: number) {
    const arr = val.split('.');
    const str = arr[1];
    if (str.length < n) {
        const addStr = Array.from({length: n - str.length}, () => '0');
        return val + addStr.join('');
    } else {
        return val;
    }
}

// // js统计字符串中包含的特定字符个数
function getPlaceholderCount(strSource: any) {
    const strArr = strSource.split('');
    let thisCount = 0;
    strArr.forEach((item: any) => {
        if (item === '.') {
            thisCount++;
        }
    });
    if (thisCount === 2) {
        return strSource.substring(0, strSource.length - 1);
    } else {
        return strSource;
    }
}

// /**
//  * 返回n位小数字符串
//  */
export function keep2strings(val: string, number?: number) {
    const n = number ? number : 2;
    const value = val.toString();
    if (value.indexOf('.') !== -1) {
        if (value.length - value.indexOf('.') > n + 1) {
            return value.substring(0, value.indexOf('.') + (n + 1));
        } else {
            return addNumber(getPlaceholderCount(value), n);
        }
    } else {
        return value + '.00';
    }
}

/**
 * 替换非数字、非小数点 不允许以 .开头 只保留除了头部的第一个点
 * @paramstr 输入的值
 */
export const replaceFloatNumber = (str: string) => {
    try {
        str = str
            .replace(/([^\d.]+|^\.)/g, '')
            .replace('.', '$#$') // 把第一个点转义然后删除其他的点再把第一个点转义回来
            .replace(/\./g, '')
            .replace('$#$', '.');
    } catch (error) {
        console.log(error);
    }
    return str;
};

/**
 * 保留两位小数，自动补充零
 * @param {string | number} money 金额
 */
export const returnFloat = (value: any) => {
    let num: any = Math.round(parseFloat(value) * 100) / 100;
    const xsd = num.toString().split('.');
    if (xsd.length === 1) {
        num = num.toString() + '.00';
        return num;
    }
    if (xsd.length > 1) {
        if (xsd[1].length < 2) {
            num = num.toString() + '0';
        }
        return num;
    }
};

// 替换非数字字母
export const checkNumTest = (str: string) => {
    return str.replace(/[^(a-zA-Z0-9)]/g, '');
};

export const toFixed = (number: any, precision: any) => {
    let str: any = number + '';
    let len = str.length;
    let last = str.substring(len - 1, len);
    if (last == '5') {
        last = '6';
        str = str.substring(0, len - 1) + last;
        return (str - 0).toFixed(precision);
    } else {
        return number.toFixed(precision);
    }
};

/**
 * 返回千位分隔符数字
 * @param {any} money
 */
export const formatNumberRgx = (num: any) => {
    const parts = floor(Number(num), 2).toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
};
