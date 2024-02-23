import {getUrlParam} from '@/utils/url';
import {getIsApp} from '@/utils/hybrid';
import {isAndroid} from '@/utils/device';
import {isBrowser} from '@/utils/detect';

/**
 * 解构react的className数组
 * @param className
 */

/**
 * 上传附件转base64
 * @param {File} file 文件流
 */
export const fileByBase64 = (file: any, callback: any) => {
    const reader = new FileReader();
    // 传入一个参数对象即可得到基于该参数对象的文本内容
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        // target.result 该属性表示目标对象的DataURL
        // console.log(e.target.result);
        callback(e.target?.result);
    };
};

export function formatContent(content: any, splitTxt = '<p>这是分割线</p>') {
    if (typeof content !== 'string' || !content) {
        return [];
    }
    return content.split(splitTxt);
}

export async function wait(time?: number) {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, time || 0);
    });
}

export const needToCallGoBack = () => {
    const {fromAppMine} = getUrlParam();
    if (!fromAppMine && getIsApp()) {
        try {
            // 安卓才需要设置
            if (isAndroid()) {
                // @ts-ignore
                window.nativeMethod.callGoBack(true);
            }
        } catch (e) {
            //
        }
    }
};

export function pxTov(value: number): number {
    return (value / 750) * 100;
}
/**
 * @description 适用于jsx组件宽度 px转vw 的场景
 * 组件行内样式或Image组件
 */
export function pxToVwStr(value: number, viewportWidth = 390): string {
    // vw比例固定
    return (value / viewportWidth) * 100 + 'vw';
}

/**
 * @description 适用于老项目 rem单位 过度为 vw
 */
export function remToVwStr(value: number, fixRem?: boolean, scale = 1): string {
    // 默认fontSize 52，fixRem 动态高度需特殊处理
    const defaultFontSize = fixRem && isBrowser() ? ((document.body.clientWidth * scale) / 375) * 50 : 52;
    return pxToVwStr(value * defaultFontSize, 375);
}

// 处理键盘返回
export function inputBlur() {
    let u = navigator.userAgent,
        isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isIOS) {
        //判断是 iOS
        setTimeout(() => {
            const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
            window.scrollTo(0, Math.max(scrollHeight - 1, 0)); // 归位
        }, 20);
    }
}
