// @ts-nocheck
import { isString } from 'lodash-es';
export function noEmoji(str) {
    const ranges = ['\ud83c[\udf00-\udfff]', '\ud83d[\udc00-\ude4f]', '\ud83d[\ude80-\udeff]'];
    return str.replace(new RegExp(ranges.join('|'), 'g'), '');
}

export function formatRealName(realName) {
    if (!realName) {
        return '';
    }
    return `${realName.substr(0, 1)}${'**************'.slice(0, realName.length - 1)}`;
}

// 计算带中文字符串长度
export function lengthInUtf8Bytes(str) {
    // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
    var m = encodeURIComponent(str).match(/%[89ABab]/g);
    return str.length + (m ? m.length : 0);
}

/**
 * 遍历配对的字符串搜索替换数组，执行字符串替换操作
 * @param text 待处理的字符串
 * @param replacementPairs 配对的字符串搜索替换数组配置
 * @example
 * console.log(replaceTextByPairs('鸭脖亚博ybYByaboYaboYaBo', [['亚博', '开云'], ['Yabo|YB', 'Kaiyun']]))
 * // => '鸭脖开云KaiyunKaiyunKaiyunKaiyunKaiyun'
 */
export function replaceTextByPairs(text: string, replacementPairs: Array<string[]>) {
    replacementPairs.forEach(([searchPattern, replaceValue]) => {
        text = text.replace(RegExp(searchPattern, 'ig'), replaceValue);
    });
    return text;
}

// 请求反序列化
export function reverseTextByPairs(value: string) {
    try {
        const data = JSON.parse(process.env.REACT_APP_TEXT_REPLACEMENT_PAIRS as string).map(
            (item) => item.reverse(),
        );
        return replaceTextByPairs(value, data);
    } catch (err) {
        return value;
    }
}

// 对象值都转化为字符串
export function objectValuesToString(ob = {}) {
    const newOb = {};
    Object.keys(ob).forEach((key) => {
        if (ob[key] !== undefined && ob[key] !== 'undefined' && ob[key] !== null) {
            newOb[key] = String(ob[key]);
        }
    });
    return newOb;
}
/**
 * 精确匹配,区分大小写
 * 遍历配对的字符串搜索替换数组，执行字符串替换操作
 * @param text 待处理的字符串
 * @param replacementPairs 配对的字符串搜索替换数组配置
 * @example
 */
export function replaceTextByPairsStrict(text: string, replacementPairs: Array<string[]>) {
    replacementPairs.forEach(([searchPattern, replaceValue]) => {
        text = text.replace(RegExp(searchPattern, 'g'), replaceValue);
    });
    return text;
}
/**
 * 根据替换数量风险选择 replaceTextByDefaultPairs / revertTextByDefaultPairs
 * 页面内 半岛->BD 字符串反向还原函数
 * 结合 replaceTextByPairsStrict 使用【接口处需 replaceTextFun 替换为 replaceTextByPairsStrict】
 * 遍历配对的字符串搜索替换数组，执行字符串替换操作
 * @param text 待处理的字符串
 * @example
 */
export function revertTextByDefaultPairs(text: string) {
    if (!isString(text)) return text;
    return replaceTextByPairs(
        text,
        JSON.parse(process.env.REACT_APP_TEXT_REPLACEMENT_PAIRS).map((item) => item.reverse()),
    );
}
/**
 * 根据替换数量风险选择 replaceTextByDefaultPairs / revertTextByDefaultPairs
 * 页面内BD->半岛字符串替换函数
 * 遍历配对的字符串搜索替换数组，执行字符串替换操作
 * @param text 待处理的字符串
 * @example
 */
export function replaceTextByDefaultPairs(text: string) {
    if (!isString(text)) return text;
    return replaceTextByPairs(text, JSON.parse(process.env.REACT_APP_TEXT_REPLACEMENT_PAIRS));
}
