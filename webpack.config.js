const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: process.env.NODE_ENV,
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        // 打包輸出後的 js 的路徑與檔名 ['js/[name].js', 'js/bundle.js']
        filename: 'js/bundle.js'
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
                test: /\.html$/,
                use: 'raw-loader'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
    ],
    devtool: 'source-map',                      // 生成 SourceMap
    devServer: {
        contentBase: path.join(__dirname, '/'), // contentBase 表示的是告訴伺服器從哪裡提供內容。（只有想提供靜態文件時才需要）['./dist']
        // publicPath: '/dist/',                // publicPath 表示的是打包生成的靜態文件所在的位置（若是 devServer 裡面的 publicPath 沒有設置，則會認為是 output 裡面設置的 publicPath 的值）
        compress: true,
        port: 7777,
        hot: true,
        open: true,
    }
}