# react开发环境搭建

webpack + babel + scss + react

## 初始化项目

```bash
# 根据提示输入，创建package.json文件
npm init
```

## 安装webpack

[官方文档](https://webpack.docschina.org/guides/getting-started)

* 安装webpack

```bash
npm install --save-dev webpack webpack-cli
```

* 配置webpack.config.js

```js
const path = require('path')

module.exports = {
    /*入口*/
    entry: path.join(__dirname, 'src/index.js'),
    
    /*输出到dist文件夹，输出文件名字为main.js*/
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'main.js'
    },

    mode: 'development'
};
```

* webpack编译

```json
"scripts": {
    "build": "webpack"
},
```

新建入口文件src/index.js
dist文件夹下面新建一个index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
    <script src="./main.js"></script>
</body>
</html>
```

```js
// index.js
document.getElementById('app').innerHTML = 'hello, react!'
```

## babel转义

```bash
npm install --save-dev babel-core babel-loader@7 babel-preset-latest babel-preset-react babel-preset-stage-2
```

注意如果babel-core的版本是6的话，babel-loader要使用7的版本

> 一种新的语法从提案到变成正式标准，需要经历五个阶段。每个阶段的变动都需要由 TC39 委员会批准。一个提案只要能进入 Stage 2，就差不多肯定会包括在以后的正式标准里面。

    Stage 0 - Strawman（展示阶段）
    Stage 1 - Proposal（征求意见阶段）
    Stage 2 - Draft（草案阶段）
    Stage 3 - Candidate（候选人阶段）
    Stage 4 - Finished（定案阶段）

* 新建babel配置文件.babelrc

```json
{
    "presets": [
        "latest",
        "react",
        "stage-2"
    ],
    "plugins": []
}
```

presets中设置转码规则

    babel-preset-latest  最新转码规则
    babel-preset-react   react 转码规则
    babel-preset-stage-2 草案阶段转码规则


* 修改webpack.config.js，增加babel-loader

```js
module: {
    rules: [{
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory=true'],
        include: path.resolve(__dirname, 'src')
    }]
}
```

```js
// index.js
var print = (str) => {
    document.getElementById('app').innerHTML = str
}

print('hello, react')
```

> cacheDirectory：默认值为 false。当有设置时，指定的目录将用来缓存 loader 的执行结果。之后的 webpack 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程(recompilation process)。

## webpack-dev-server配置web服务器

webpack-dev-server就是一个小型的静态文件服务器。使用它，可以为webpack打包生成的资源文件提供Web服务。

当然也可以直接使用http-server、anywhere、live-server等访问，不过没有webpack-dev-server方便

```bash
npm install --save-dev webpack-dev-server
```

* 添加npm scripts脚本

```json
"scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server"
},
```

* 修改webpack.config.js，增加webpack-dev-server配置

```js
devServer: {
    // URL的根目录。如果不设定的话，默认指向项目根目录
    contentBase: path.resolve(__dirname, './dist'),
    historyApiFallback: true,   // 让所有的404定位到index.html。
    port: 8080,
    host: '127.0.0.1'
}
```

## 编译scss

```bash
npm install --save-dev sass-loader node-sass style-loader css-loader
```

* 添加rules

```js
// webpack.config.js
module.exports = {
  ...
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
          loader: "style-loader"
      }, {
          loader: "css-loader"
      }, {
          loader: "sass-loader"
      }]
    }]
  }
};
```

* 使用scss

```css
/* index.scss */
body {
    color: #ccc;
}
```

```js
// index.js
import './index.scss'
```

## HtmlWebpackPlugin

这个插件，每次会自动把js插入到你的模板index.html里面去。

```bash
npm install --save-dev html-webpack-plugin
```

* 把index.html放到src中，去除之前js的引入

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

* 修改webpack.config.js

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

// ...

plugins: [
    // 根据模板生成html页面
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'src/index.html')
    })
]
```

## 文件hash

解决上线缓存问题

```js
// webpack.config.js
output: {
    path: path.join(__dirname, './dist'),
    filename: '[name]-[hash:6].js'
}
```

## 使用react

```bash
npm install --save react react-dom
```

* 使用react

```js
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render (
    <div>Hello React!</div>, 
    document.getElementById('app')
);
```

## 最后

到此为止，我们的开发环境基本配置完成了，我们已经可以进行下一步具体的react开发了

不过还有很多优化配置就不在此一一详细描述了，大家可以自行探索

* 生产环境打包与开发环境是不太一样的，比如开发环境是不需要webpack-dev-server的，而且代码需要进行压缩
* 打包时自动清理dist文件夹
* 不同的页面打包自己单独的js，按需加载
* 模块热替换配置
* 代码风格检查ESLint配置，可以关联git commit，检查不通过不能提交
* 图片的编译，小的图片可以直接编译成base64格式
