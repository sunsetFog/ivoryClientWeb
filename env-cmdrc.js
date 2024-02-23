/*
env-cmd 是一个用于在 npm scripts 中设置环境变量的工具。
*/

require('ts-node').register();

// 跨品牌共享配置
const MAP = {
    dev: {
        REACT_APP_API_MICROSERVICE_URL: 'https://testing-microservices.yk8s.in',
    },
    release: {
        REACT_APP_API_MICROSERVICE_URL: 'https://production-microservices.yk8s.in',
    },
    prod: {
        REACT_APP_API_MICROSERVICE_URL: 'https://production-microservices.yk8s.in',
    },
};

const { encrypt } = require('./src/utils/encrypt');

const dev_username = encrypt('testhangaround');
const dev_password = encrypt('testhangaround');
const release_username = encrypt('ilovealbert');
const release_password = encrypt('fuckyoudididada');

const release_aes_key = 'GGGMCcdYCnbzeCOivJZbUatjgrJRJRRO';
const release_aes_iv = 'LmrAeNihy7BixNo8';
const release_finance_aes_key = 'm2l30d6MJ1sThagvM59XOZnz7j5GNAxZ';
const release_finance_aes_iv = 'K5RpoXHwnAvVlFfz';

// commit信息
function getGitCommit() {
    try {
        return require('fs').readFileSync('./public/commit.txt', 'utf-8').toString();
    } catch (err) {
        return err.toString();
    }
}

const BUILD_VERSION = getGitCommit();

const PLATFORM_MAP = {
    // bd
    bd: {
        // 各个环境公用的变量
        common: {
            SERVER_PORT: 6001, // 本地开发/服务器启动环境端口
            SECURITY_PORT: 16001, // 安全检查版H5服务端口
            SPORT_PORT: 19002, // 体育h5服务端口
            REACT_APP_TEXT_REPLACEMENT_PAIRS: JSON.stringify([
                ['bd', '半岛'], //
            ]),
            REACT_APP_VERSION: BUILD_VERSION,
        },
        // 测试环境
        dev: {
            REACT_APP_API_SPORT_BASE_URLS: {
                IMTY: 'https://ybbw031-mxxmm-test.imapi.net',
                YBTY: 'https://api2.sportxxx278gwf4.com',
                FBTY: 'https://sportapi.fastball2.com',
            }, // 三方体育api域名（launch接口会返回，此配置为默认api值）
            REACT_APP_API_BASE_URL: 'http://h5.fgry45iy.com',
            REACT_APP_GUEST_FORM_USERNAME: dev_username,
            REACT_APP_GUEST_FORM_PASSWORD: dev_password,
            REACT_APP_GUEST_AES_KEY: 'lFZHuhOwrSrK8WkPHznzzmFA6nI2JnyF',
            REACT_APP_GUEST_AES_IV: '5EFTXZMKjWoLtPrA',
            REACT_APP_GUEST_FINANCE_AES_KEY: '7CAvvV1+QeaxMdqM2Wp4gbeRhS4s2BAv',
            REACT_APP_GUEST_FINANCE_AES_IV: '2oblNID+45RaQPV2',
            REACT_APP_SERVER_VIDEO_URL: 'http://16.162.206.193:80', // 视频访问域名
        },
        // 预发环境
        release: {
            REACT_APP_API_BASE_URL: 'https://pre-h5.sstjxbb.com',
            REACT_APP_GUEST_FORM_USERNAME: release_username,
            REACT_APP_GUEST_FORM_PASSWORD: release_password,
            REACT_APP_GUEST_AES_KEY: release_aes_key,
            REACT_APP_GUEST_AES_IV: release_aes_iv,
            REACT_APP_GUEST_FINANCE_AES_KEY: release_finance_aes_key,
            REACT_APP_GUEST_FINANCE_AES_IV: release_finance_aes_iv,
            REACT_APP_REACT_APPSERVER_VIDEO_URL: 'http://16.162.206.193:80', // 视频访问域名
        },
        // 生产环境
        prod: {
            REACT_APP_API_BASE_URL: 'http://api.envdfq.com',
            REACT_APP_GUEST_FORM_USERNAME: release_username,
            REACT_APP_GUEST_FORM_PASSWORD: release_password,
            REACT_APP_GUEST_AES_KEY: release_aes_key,
            REACT_APP_GUEST_AES_IV: release_aes_iv,
            REACT_APP_GUEST_FINANCE_AES_KEY: release_finance_aes_key,
            REACT_APP_GUEST_FINANCE_AES_IV: release_finance_aes_iv,
            REACT_APP_SERVER_VIDEO_URL: 'http://p1.video.com',
        },
    },
    // 天博
    tb: {
        // 各个环境公用的变量
        common: {
            SERVER_PORT: 6002, // 本地开发/服务器启动环境端口
            REACT_APP_VERSION: BUILD_VERSION,
            SECURITY_PORT: 16002, // 安全检查版H5服务端口
        },
        // 测试环境
        dev: {
            REACT_APP_API_BASE_URL: 'http://h5.ssgonna.com',
            REACT_APP_GUEST_FORM_USERNAME: dev_username,
            REACT_APP_GUEST_FORM_PASSWORD: dev_password,
            REACT_APP_GUEST_AES_KEY: 'VD8ylQpydxFdFDnxtk4jPv9XkVNkMWr4',
            REACT_APP_GUEST_AES_IV: 'p6VSBZWtFalCw8w9',
            REACT_APP_GUEST_FINANCE_AES_KEY: '7CAvvV1+QeaxMdqM2Wp4gbeRhS4s2BAv',
            REACT_APP_GUEST_FINANCE_AES_IV: '2oblNID+45RaQPV2',
            REACT_APP_SERVER_VIDEO_URL: 'http://16.162.206.193:80', // 视频访问域名
        },
        // 预发环境
        release: {
            REACT_APP_API_BASE_URL: 'https://pre-h5.theyyone.com',
            REACT_APP_GUEST_FORM_USERNAME: release_username,
            REACT_APP_GUEST_FORM_PASSWORD: release_password,
            REACT_APP_GUEST_AES_KEY: release_aes_key,
            REACT_APP_GUEST_AES_IV: release_aes_iv,
            REACT_APP_GUEST_FINANCE_AES_KEY: release_finance_aes_key,
            REACT_APP_GUEST_FINANCE_AES_IV: release_finance_aes_iv,
            REACT_APP_SERVER_VIDEO_URL: 'http://16.162.206.193:80', // 视频访问域名
        },
        // 生产环境
        prod: {
            REACT_APP_API_BASE_URL: 'http://h5.sugar90.com',
            REACT_APP_GUEST_FORM_USERNAME: release_username,
            REACT_APP_GUEST_FORM_PASSWORD: release_password,
            REACT_APP_GUEST_AES_KEY: release_aes_key,
            REACT_APP_GUEST_AES_IV: release_aes_iv,
            REACT_APP_GUEST_FINANCE_AES_KEY: release_finance_aes_key,
            REACT_APP_GUEST_FINANCE_AES_IV: release_finance_aes_iv,
            REACT_APP_SERVER_VIDEO_URL: 'http://p2.video.com',
        },
    },
};

// 环境列表
const ENV_LIST = [
    'dev', // 测试环境
    'release', // 预发环境
    'prod', // 生产环境
];

module.exports = Object.keys(PLATFORM_MAP).reduce((prev, curr) => {
    // 当前平台值
    const result = PLATFORM_MAP[curr];
    // 获取当前端口
    const { SERVER_PORT, SECURITY_PORT, ...restCommon } = result.common || {};

    // 开发环境
    ENV_LIST.forEach((item) => {
        prev[`server:${item}:${curr}`] = Object.assign(
            {
                REACT_APP_PLATFORM: curr,
                REACT_APP_ENV: item,
                PORT: SERVER_PORT,
                REACT_APP_GAMES_GROUP: item != 'prod' ? 'security' : '',
            },
            restCommon,
            result[item],
            MAP[item],
        );
        prev[`server:${item}:${curr}:security`] = Object.assign(
            {},
            prev[`server:${item}:${curr}`],
            {
                REACT_APP_PLATFORM: curr,
                REACT_APP_ENV: item,
                PORT: SECURITY_PORT,
                REACT_APP_GAMES_GROUP: 'security',
            },
            restCommon,
            result[item],
            MAP[item],
        );
    });
    // 构建环境
    ENV_LIST.forEach((item) => {
        prev[`build:${item}:${curr}`] = Object.assign(
            {
                REACT_APP_PLATFORM: curr,
                REACT_APP_ENV: item,
                NODE_ENV: 'production',
                // REACT_APP_GAMES_GROUP: item != 'prod' ? 'security' : '',// 测试环境ssg 服务端拿不到cookie和路由参数 移动端页面会闪动该模式下的最好不适用于app
            },
            restCommon,
            result[item],
            MAP[item],
        );
        prev[`build:${item}:${curr}:security`] = Object.assign(
            {},
            prev[`build:${item}:${curr}`],
            {
                REACT_APP_PLATFORM: curr,
                REACT_APP_ENV: item,
                PORT: SECURITY_PORT,
                REACT_APP_GAMES_GROUP: 'security',
                NODE_ENV: 'production',
            },
            restCommon,
            result[item],
            MAP[item],
        );
    });

    // 服务器启动
    ENV_LIST.forEach((item) => {
        prev[`start:${item}:${curr}`] = Object.assign(
            {
                REACT_APP_PLATFORM: curr,
                REACT_APP_ENV: item,
                NODE_ENV: 'production',
                PORT: process.env.PORT || SERVER_PORT,
                // REACT_APP_GAMES_GROUP: item != 'prod' ? 'security' : '',
            },
            restCommon,
            result[item],
            MAP[item],
        );
        prev[`start:${item}:${curr}:security`] = Object.assign(
            {},
            prev[`start:${item}:${curr}`],
            {
                PORT: process.env.PORT || SECURITY_PORT,
                REACT_APP_GAMES_GROUP: 'security',
            },
            restCommon,
            result[item],
            MAP[item],
        );
    });

    // 打包分析
    prev[`analyze:${curr}`] = Object.assign(
        {
            REACT_APP_PLATFORM: curr,
            ANALYZE: true,
        },
        restCommon,
        result.prod,
    );

    // 返回数据
    return prev;
}, {});
