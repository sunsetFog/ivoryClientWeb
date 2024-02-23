// 检测是否需要浏览器检测
import {setCookies, getCookies} from '@/utils/cookies';

export const getHasBrowserCheck = (req: any): boolean => {
    // 如果是app, 不处理
    if (req?.query?.isApp) {
        return true;
    }
    if (process.env.REACT_APP_GAMES_GROUP !== 'security') {
        return true;
    }
    // 如果cookie带isCheck字段
    return !!req?.cookies?.isCheck;
};

export class browserCheckUtil {
    static key = 'isCheck';

    static getCookie() {
        return getCookies(this.key, {path: '/'});
    }

    static setCookie() {
        setCookies(this.key, '1', {path: '/', expires: 1});
    }
}
