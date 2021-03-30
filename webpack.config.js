const path                      = require('path');
const webpack                   = require('webpack');
const glob                      = require('glob');
const HtmlWebpackPlugin         = require("html-webpack-plugin");
const MiniCssExtractPlugin      = require("mini-css-extract-plugin");
const { CleanWebpackPlugin }    = require('clean-webpack-plugin');

var config = {
    mode: process.env.NODE_ENV,
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: 'js/bundle.js',   // SPA
        filename: 'js/[name].js'       // MPA
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|jpe?g|svg)$/, // /\.(woff|woff2|eot|ttf|otf|png|svg|jpg|gif)$/
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            esModule: false,
                            name: '[path][name].[ext]',
                            context: path.resolve(__dirname, 'src'),
                            publicPath: '../',
                            fallback: require.resolve('file-loader'),
                            // outputPath: './'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable:    process.env.NODE_ENV === 'production' ? false : true,
                            mozjpeg:    { progressive: true, quality: 65 },
                            optipng:    { enabled: false },
                            pngquant:   { quality: [0.65, 0.9], speed: 4 },
                            gifsicle:   { interlaced: false },
                            webp:       { quality: 75 },  // 配置選項表示啟用 WebP 優化器
                        }
                    }
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         // [name] 為使用原本檔案的名稱；[ext] 則是副檔名，組合起來的意思就是，我們希望可以保留原本檔案的名稱以及副檔名
                    //         name: '[path][name].[ext]',
                    //         // 待補說明
                    //         context: path.resolve(__dirname, 'src'),
                    //         // 待補說明
                    //         // outputPath: 'dist/',
                    //         // 設定目標文件的路徑，白話說就是 SCSS 編譯後產生的 CSS 檔內圖檔的路徑
                    //         publicPath: '../',
                    //         // 默認為 true ，如果為 true，則將該檔案輸出。如果為 false，則僅在 CSS 內寫入 publicPath，而不會輸出該檔案。
                    //         // emitFile: true,
                    //         esModule: false
                    //     }  
                    // },
                ]
            },
            {
                test: /\.pug$/,
                use: [
                    'raw-loader',
                    {
                        loader: 'pug-html-loader',
                        options: {
                            // https://milkmidi.medium.com/test-c3a23ca0cc55
                            data: {
                                NODE_ENV: process.env.NODE_ENV,
                                AUTHOR: 'Brent Hsieh'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/bundle.css'
        }),
        // new HtmlWebpackPlugin({
        //     template: './src/index.html',
        //     filename: 'index.html'
        // }),
        // new HtmlWebpackPlugin({
        //     template: './src/pages/index.pug',
        //     filename: 'index.html'
        // }),
        new CleanWebpackPlugin()
    ],
    devtool: 'source-map',                      // 生成 SourceMap
    devServer: {
        contentBase: path.join(__dirname, '/'), // contentBase 表示的是告訴伺服器從哪裡提供內容。（只有想提供靜態文件時才需要）['./dist']
        // publicPath: '/dist/',                // publicPath 表示的是打包生成的靜態文件所在的位置（若是 devServer 裡面的 publicPath 沒有設置，則會認為是 output 裡面設置的 publicPath 的值）
        compress: true,
        port: 7777,
        hot: true,
        // open: true,
    }
}

const entry = {}
const entryFiles = glob.sync(path.join(__dirname, './src/pages/*.pug'));

Object.keys(entryFiles).map(index => {

    const entryFile = entryFiles[index];
    const match     = entryFile.match(/src\/pages\/(.*)\.pug/);
    const pageName  = match && match[1];

    entry[pageName] = './src/js/' + pageName + '.js';

    config.plugins.push(
        new HtmlWebpackPlugin({
            template: path.join(__dirname, `src/pages/${pageName}.pug`),
            filename: `${pageName}.html`,
            // 引入的 js 文件
            chunks: [pageName],
            inject: true,
            minify: {
                collapseWhitespace: true,
                collapseBooleanAttributes: true, 
                preserveLineBreaks: false,
                sortAttributes: true,
                removeComments: true
            }
        })
    );

})

config.entry = entry;

module.exports = config