/*
用于在开发环境下设置代理
*/
const {trimEnd} = require('sunny-js');

const proxySettings = {};
[
    '/assets',
    '/dc',
    '/api',
    '/assets',
    '/game/api',
    '/stream',
    '/fd',
    '/ins/api',
    '/dc/api',
    '/site/api',
    '/agent/api',
    '/acts/api',
    '/component/api'
].map((source) => {
    proxySettings[source] = {
        changeOrigin: true,
        target: trimEnd(process.env.REACT_APP_API_BASE_URL)
    };
});

module.exports = proxySettings;
