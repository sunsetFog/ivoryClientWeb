// 返回2位小数字符串
export function keep2String(value: any, maxLen = 2) {
    // 首先转化为string
    if (typeof value !== 'string') {
        value = String(value);
    }
    // 如果是.开始, 返回空
    if (value === '.') return '';
    // 如果不包含.
    if (value.indexOf('.') < 0) {
        return String(Number(value));
    }
    // 分割.得到首位小数和尾数
    const [num, decimal] = value.split('.');
    // 如果不要小数
    if (maxLen <= 0) {
        return num;
    }
    // 拼接数字和小数
    return `${Number(num)}.${decimal.length > maxLen ? decimal.slice(0, maxLen - 1) + decimal.slice(-1) : decimal}`;
}

// 返回小数字符串
export function keep2String2(value: any, maxLen = 2) {
    // 首先转化为string
    if (typeof value !== 'string') {
        value = String(value);
    }
    // 如果是.开始, 返回空
    if (value === '.') return '';
    // 如果包含.
    if (value.indexOf('.') < 0) {
        let valueStr = String(Number(value)) + '.';
        for (let i = 0; i < maxLen; i++) {
            valueStr += '0';
        }
        return valueStr;
    }
    // 分割.得到首位小数和尾数
    const [num, decimal] = value.split('.');
    // 如果不要小数
    if (maxLen <= 0) {
        return num;
    }
    // 拼接数字和小数
    return `${Number(num)}.${decimal.length > maxLen ? decimal.slice(0, maxLen - 1) + decimal.slice(-1) : decimal}`;
}

export function formatCollectCount(num: number) {
    // 判断是否小于0
    if (num < 0) {
        num = 0;
        return num;
        // 判断是否小于1W
    } else if (num < 100000) {
        return num;
    }
    // 判断是否小于10W,或者大于等于10W
    if (num < 10000 * 10 && num >= 10000) {
        // 判断num求余之后是否大于0
        if (num % 10000 === 0) {
            // 返回该变量除于1W,返回多少W
            return num / 10000 + '万';
            // 否则该变量除于1W返回四舍五入保留2位小数
        } else {
            return (num / 10000).toFixed(2) + '万';
        }
    }
    // 判断是否小于100W或者大于等于10W
    if (num < 10000 * 100 && num >= 10000 * 10) {
        // 判断除余之后是否等于0
        if (num % 10000 === 0) {
            // 如果等于就返回除于1W后的个数
            return num / 10000 + '万';
            // 否则除于1W,四舍五入保留一位小数
        } else {
            return (num / 10000).toFixed(1) + '万';
        }
    }
    // 判断是否大于等于100W,条件成立返回四舍五入整数
    if (num >= 10000 * 100) {
        return Math.round(num / 10000) + '万';
    }
}

// 获取var nums=retain(33.45678, 2); 保留2位小数
export function retain(num = '0.00', decimal = 2) {
    num = num.toString();
    let index = num.indexOf('.');
    if (index !== -1) {
        num = num.substring(0, decimal + index + 1);
    } else {
        num = num.substring(0);
    }
    return parseFloat(num).toFixed(decimal);
}
