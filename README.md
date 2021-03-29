# webpack-practice
## 套件安裝及設定
- webpack, webpack-cli
```
npm install webpack webpack-cli --save-dev
```
---
- webpack-dev-server  
https://awdr74100.github.io/2020-03-26-webpack-webpackdevserver/
```
npm install webpack-dev-server --save-dev
```
package.json 設定
```
{
    "scripts": {
        "serve": "webpack serve --mode development",
        "build": "webpack --mode production"
    }
}
```
webpack.config.js 設定
```
module.exports = {
    // ...
    devServer: {
        contentBase: path.join(__dirname, '/'), // contentBase 表示的是告訴伺服器從哪裡提供內容。（只有想提供靜態文件時才需要）['./dist']
        // publicPath: '/dist/',                // publicPath 表示的是打包生成的靜態文件所在的位置（若是 devServer 裡面的 publicPath 沒有設置，則會認為是 output 裡面設置的 publicPath 的值）
        compress: true,
        port: 7777,
        hot: true,
        open: true,
    }
    // ...
};
```
---
- reset.css
```
npm install reset-css
```
---
- normalize.css
```
npm install normalize.css --save
```
---
- jQuery
```
npm install jquery --save
```
webpack.config.js 設定
```
module.exports = {
    // ...
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
    // ...
};
```
---
- clean-webpack-plugin  
在每次編譯 Webpack 時，都必須刪除之前測試所建立的 dist 資料夾，以確保結果為最新狀態，可能有些人並沒有這個困擾，那是因為並沒有在 filename 屬性加入 hash 值，此時編譯處理為取代其檔案，在一般開發中我們都會在檔案名稱加入 hash 值，避免快取機制發生的問題，此時由於檔案名稱的 hash 值不同，其編譯處理將轉為新增，dist 資料夾也就會遺留之前測試所建構出的檔案。使用 clean-webpack-plugin 在每次編譯時刪除之前測試所建構出的檔案，接著才生成編譯結果。  
https://awdr74100.github.io/2020-03-25-webpack-cleanwebpackplugin/
```
npm install clean-webpack-plugin --save-dev
```
---
- css-loader, style-loader, mini-css-extract-plugin  
https://awdr74100.github.io/2020-02-26-webpack-cssloader-styleloader/  
https://awdr74100.github.io/2020-03-02-webpack-minicssextractplugin/
```
npm install css-loader style-loader mini-css-extract-plugin --save-dev
```
---
- sass-loader, node-sass
```
npm install sass-loader node-sass --save-dev
```
---
- file-loader url-loader  
file-loader 就是用來處理一般開發網頁時所使用的靜態資源，例如：字形、圖片等等，將所有資源載入到 Webpack 內，並且解析資源的相互依賴，最後以配置的選項生成對應的結果；而 url-loader 則類似於 file-loader，可依資源的大小做對應的處理  
https://awdr74100.github.io/2020-03-09-webpack-urlloader-fileloader/
```
npm install file-loader url-loader --save-dev
```
---
- terser-webpack-plugin
可以幫我們壓縮 js，根據設定也可去除 console 等等
```
npm install terser-webpack-plugin --save-dev
```
---
- html-loader
匯出 HTML 為字串，需要引用靜態資源
```
npm install html-loader --save-dev
```
---
- html-webpack-plugin
html-webpack-plugin 可以幫助我們指定任意的 HTML 模板，並透過傳遞選項方式，生成對應的 HTML 文件，同時也會將 entry 內的所有靜態文件做引入動作，解決手動引入的困擾。  
https://awdr74100.github.io/2020-03-23-webpack-htmlwebpackplugin/
```
npm install html-webpack-plugin --save-dev
```
---
- raw-loader  
html hot reload 需要使用
```
npm install raw-loader --save-dev
```
webpack.config.js 設定
```
module: {
    // ...
    rules: [
        {
            test: /\.html$/,
            use: 'raw-loader'
        }
    ]
    // ...
},
```
進入點（例如: main.js）加入
```
if (process.env.NODE_ENV !== 'production') {
    require('./index.html')
}
```
---
- pug-html-loader  
https://soarlin.github.io/2020/07/18/pug-sass-boilerplate/  
https://medium.com/%E5%B0%8F%E5%BD%A5%E5%BD%A5%E7%9A%84%E5%89%8D%E7%AB%AF%E4%BA%94%E5%9B%9B%E4%B8%89/%E5%9C%A8webpack%E4%B8%AD%E4%BD%BF%E7%94%A8pug%E7%94%A2%E7%94%9Fhtml-24eb9fec22c7
```
npm install pug-html-loader --save-dev
```
---
- image-webpack-loader  
壓縮圖片  
https://awdr74100.github.io/2020-07-24-webpack-imagewebpackloader/
```
npm install image-webpack-loader --save-dev
```
---  

## 待了解
- cross-env
- [Webpack｜教學：webpack多入口/多出口配置](https://medium.com/anna-hsaio-%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC%E8%A8%98/webpack-%E6%95%99%E5%AD%B8-webpack%E5%A4%9A%E5%85%A5%E5%8F%A3-%E5%A4%9A%E5%87%BA%E5%8F%A3%E9%85%8D%E7%BD%AE-b15a1a2fd74a)
- [使用 Webpack 打包圖片](https://medium.com/@pvt5r486/%E4%BD%BF%E7%94%A8-webpack-%E6%89%93%E5%8C%85%E5%9C%96%E7%89%87-8f0e0f453f30)
- [使用 webpack 打包多頁面應用（Multiple-Page Application）](https://www.bookstack.cn/read/webpack-and-spa-guide/spilt.5.README.md)
- [Webpack — Multiple Page Application](https://medium.com/summers-life/webpack-multiple-page-application-484c5983d104)