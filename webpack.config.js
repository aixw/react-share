const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    /*入口*/
    entry: path.join(__dirname, 'src/index.js'),
    
    /*输出到dist文件夹，输出文件名字为main.js*/
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'main-[hash:6].js'
    },

    mode: 'development',

    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader?cacheDirectory=true'],
            include: path.resolve(__dirname, 'src')
        },{
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }]
          }]
    },

    devServer: {
        // URL的根目录。如果不设定的话，默认指向项目根目录
        contentBase: path.resolve(__dirname, './dist'),
        historyApiFallback: true,   // 让所有的404定位到index.html。
        port: 8080,
        host: '127.0.0.1'
    },

    plugins: [
        // 根据模板生成html页面
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/index.html')
        })
    ]
};