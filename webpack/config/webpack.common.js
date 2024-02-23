/*
用于定义公共的 Webpack 配置
*/
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 简化 HTML 文件创建以服务捆绑包的插件, 将js文件自动引进 html 文件中

const WebpackBar = require('webpackbar'); // 优雅的 Webpack 进度条和分析器
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin'); // 启动本地服务/打包错误提示
const CopyPlugin = require('copy-webpack-plugin'); // 将已存在的单个文件或整个目录复制到生成目录
const webpack = require('webpack');
const paths = require('../paths');
const {isDevelopment, isProduction} = require('../env');

const rules = require('./rules');

// console.log(paths.appDefineVariable);
// console.log('isDevelopment', isDevelopment);



const config = {
    entry: {
        app: paths.appIndex
    },
    cache: {
        // 缓存,cache.type 设置为 'filesystem' 是会开放更多的可配置项。
        // 收集在反序列化期间分配的未使用的内存，, 仅当 cache.type 设置为 'filesystem' 时生效。这需要将数据复制到更小的缓冲区中，并有性能成本。
        type: 'filesystem',
        buildDependencies: {
            // 是一个针对构建的额外代码依赖的数组对象。webpack 将使用这些项和所有依赖项的哈希值来使文件系统缓存失效。
            config: [__filename]
        }
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json', '.scss', '.less'],
        alias: {
            '@': paths.appSrc,
            '@sky': paths.appSky,
            '@root': paths.appRoot,
            mock: paths.appMock,
            Components: paths.appSrcComponents,
            Utils: paths.appSrcUtils
        }
    },
    module: {
        rules: rules
    },
    plugins: [
        // 全局变量，process.env环境变量转全局变量
        new webpack.DefinePlugin(paths.appDefineVariable),
        new HtmlWebpackPlugin({
            title: '爱沃里',
            template: paths.appHtml,
            favicon: paths.appPublic + '/favicon_' + process.env.REACT_APP_PLATFORM + '.ico',
            cache: true
        }),
        new CopyPlugin({
            patterns: [
                {
                    context: paths.appPublic,
                    from: '*',
                    to: paths.appBuild,
                    toType: 'dir',
                    globOptions: {
                        dot: true,
                        gitignore: true,
                        ignore: ['**/index.html']
                    }
                }
            ]
        }),
        new WebpackBar({
            name: isDevelopment ? 'RUNNING' : 'BUNDLING',
            color: isDevelopment ? '#52c41a' : '#722ed1'
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: paths.appTsConfig
            }
        })
    ]
};
// console.log("--cssLoaders-1-", JSON.stringify(cssLoaders(1), null, 4))
// console.log("--config-1-", JSON.stringify(config, null, 4))
module.exports = config;
