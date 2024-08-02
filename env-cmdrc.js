/*
env-cmd 是一个用于在 npm scripts 中设置环境变量的工具。
*/

require('ts-node').register();

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
            REACT_APP_VERSION: BUILD_VERSION,
        },
        // 测试环境
        dev: {
            REACT_APP_API_BASE_URL: 'http://h5.fgry45iy.com',
            REACT_APP_SERVER_VIDEO_URL: 'http://16.162.206.193:80', // 视频访问域名
        },
        // 预发环境
        release: {
            REACT_APP_API_BASE_URL: 'https://pre-h5.sstjxbb.com',
            REACT_APP_REACT_APPSERVER_VIDEO_URL: 'http://16.162.206.193:80', // 视频访问域名
        },
        // 生产环境
        prod: {
            REACT_APP_API_BASE_URL: 'http://api.envdfq.com',
            REACT_APP_SERVER_VIDEO_URL: 'http://p1.video.com',
        },
    },
    // 天博
    tb: {
        // 各个环境公用的变量
        common: {
            SERVER_PORT: 6002, // 本地开发/服务器启动环境端口
            REACT_APP_VERSION: BUILD_VERSION,
        },
        // 测试环境
        dev: {
            REACT_APP_API_BASE_URL: 'http://h5.ssgonna.com',
            REACT_APP_SERVER_VIDEO_URL: 'http://16.162.206.193:80', // 视频访问域名
        },
        // 预发环境
        release: {
            REACT_APP_API_BASE_URL: 'https://pre-h5.theyyone.com',
            REACT_APP_SERVER_VIDEO_URL: 'http://16.162.206.193:80', // 视频访问域名
        },
        // 生产环境
        prod: {
            REACT_APP_API_BASE_URL: 'http://h5.sugar90.com',
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
    const { SERVER_PORT, ...restCommon } = result.common || {};

    // 开发环境
    ENV_LIST.forEach((item) => {
        prev[`server:${item}:${curr}`] = Object.assign(
            {
                REACT_APP_PLATFORM: curr,
                REACT_APP_ENV: item,
                PORT: SERVER_PORT,
            },
            restCommon,
            result[item],
        );
    });
    // 构建环境
    ENV_LIST.forEach((item) => {
        prev[`build:${item}:${curr}`] = Object.assign(
            {
                REACT_APP_PLATFORM: curr,
                REACT_APP_ENV: item,
                NODE_ENV: 'production',
            },
            restCommon,
            result[item],
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
            },
            restCommon,
            result[item],
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
