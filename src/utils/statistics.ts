/**
 * 数据统计
 *
 * @param url  页面路径
 * @param page  当前页面
 * @param Details 具体内容
 */
import {getUrlParam} from '@/utils/url';

export function setDataStatistics(url: string, page: any, Details: any) {
    try {
        if (window && (window as any)._czc) {
            (window as any)._czc.push(['_trackPageview', url, document.location.href]);
            (window as any)._czc.push(['_trackEvent', page, Details]);
        }
    } catch (error) {
        console.error(error);
    }
}

export function getSource() {
    const urlObj: any = getUrlParam();
    const source = urlObj.source || localStorage.getItem('source') || document.referrer;
    let sourceNow = '';
    if (source) {
        if (source.indexOf('sogou') !== -1) {
            sourceNow = 'sougou';
        } else if (source.indexOf('shenma') !== -1) {
            sourceNow = 'shenma';
        } else if (source.indexOf('baidu') !== -1) {
            sourceNow = 'baidu';
        } else if (source.indexOf('jiechi') !== -1) {
            sourceNow = 'jiechi';
        }
    }
    return sourceNow;
}
