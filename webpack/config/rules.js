
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽离css文件, 这个插件将CSS取到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件。它支持按需加载 CSS 和 SourceMaps。
const {imageInlineSizeLimit, imageBase64Path, shouldBase64FromFileEnd} = require('../conf');
const {isDevelopment, isProduction} = require('../env');
const paths = require('../paths');
/*
在dev环境中，自定义的静态资源文件名格式
webpack内置的模板变量
- [hash] - 根据资源内容生成的 hash 字符串,用于版本管理
- [name] - 资源原始名称
- [ext] - 资源原始扩展名
- [path] - 资源相对于 webpack config 文件的路径
- [folder] - 资源所在文件夹名称
- [query] - 资源查询字符串
- [emoji] - 一个随机的表情符号
*/
const modulesObj = {
    exportGlobals: true,
    localIdentName: '[path]__[name]__[local]--[hash:base64:5]'
};
if (isProduction) {
    delete modulesObj.localIdentName;
}

const cssLoaders = (importLoaders) => [
    // 执行顺序从后到前 less-loader -> postcss-loader -> css-loader -> style-loader/MiniCssExtractPlugin.loader
    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, // style-loader的作用就是将结果以style标签的方式插入DOM树中。style-loader将css-loader打包好的 CSS 代码以<style>标签的形式插入到 HTML 文件中
    {
        loader: 'css-loader', // 主要是解析css文件中的@import和url语句，处理css-modules，并将结果作为一个js模块返回
        options: {
            modules: modulesObj, //
            sourceMap: isDevelopment, // 开发环境开启
            importLoaders // 执行顺序: 需要先被 less-loader postcss-loader (所以这里设置为 2)
            // 0 => no loaders (default);
            // 1 => postcss-loader;
            // 2 => postcss-loader, sass-loader
        }
    },
    {
        loader: 'postcss-loader', // 进一步处理css文件，比如添加浏览器前缀，压缩 CSS 等
        options: {
            postcssOptions: {
                plugins: [
                    require('postcss-flexbugs-fixes'), // 用于修复一些和 flex 布局相关的 bug
                    [
                        'postcss-preset-env', // 最新的 CSS 语法转换为目标环境的浏览器能够理解的 CSS 语法，目的是使开发者不用考虑浏览器兼容问题。
                        {
                            // 使用 autoprefixer 来自动添加浏览器头
                            autoprefixer: {
                                grid: true,
                                flexbox: 'no-2009'
                            },
                            stage: 3
                        }
                    ],
                    'postcss-normalize'
                ]
            }
        }
    }
];

module.exports = [
    {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader', // 使用缓存
        options: {cacheDirectory: true},
        exclude: [/node_modules/, /(.|_)min\.js$/]
    },
    {
        test: /\.css$/,
        use: cssLoaders(1)
    },
    {
        test: /\.less$/,
        use: [
            ...cssLoaders(2),
            {
                loader: 'less-loader',
                options: {
                    sourceMap: isDevelopment
                }
            }
        ]
    },
    {
        test: /\.scss$/,
        use: [
            ...cssLoaders(2),
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: isDevelopment
                }
            },
            {
                loader: 'sass-resources-loader',
                options: {
                    resources: `${paths.appSrc}/@energy/styles/platform/${process.env.REACT_APP_PLATFORM}/scssVariable.scss`,
                    hoistUseStatements: true,
                },
            }
        ]
    },
    {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        parser: {
            // 当提供函数时，返回 true 值时告知 webpack 将模块作为一个 Base64 编码的字符串注入到包中，
            // 否则模块文件会被生成到输出的目标目录中。将base64的资源都放在一个目录下
            dataUrlCondition: (source, {filename}) => {
                // 1. 如果是base64下的目录，将文件打包成base64
                if (filename.includes(imageBase64Path)) {
                    return true;
                }
                // 2. 如果开启了文件尾部扫描，则形如 xxx.base64.xxx会以Base64 编码的字符串注入到包中
                if (shouldBase64FromFileEnd && filename.includes('.base64')) {
                    return true;
                }
                // 3. 对于小于imageInlineSizeLimit的文件，会以Base64 编码的字符串注入到包中
                if (source.length <= imageInlineSizeLimit) {
                    return true;
                }
                return false;
            }
        }
    },
    {
        test: /\.(eot|ttf|woff|woff2?)$/,
        exclude: paths.appSvg, // 不处理 svg类型文件
        type: 'asset/resource'
    },
    {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: paths.appSvg,
        options: {
            symbolId: 'icon-[name]' // symbolId和use使用的名称对应 <use xlinkHref={"#icon-" + svgName} />
        }
    }
]
