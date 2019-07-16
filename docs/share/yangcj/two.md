# Dva
## 安装 dva-cli
通过 npm 安装 dva-cli 并确保版本是 0.9.1 或以上。
``` js
$ npm install dva-cli -g
$ dva -v
dva-cli version 0.9.1
```

创建新应用
``` js
$ dva new dva-project // dva-project为项目文件名
```

然后我们 cd 进入 dva-quickstart 目录，并启动开发服务器：
``` js
$ cd dva-project // 进入文件夹
$ npm start
```
几秒钟后，你会看到以下输出：
``` sh
Compiled successfully!

The app is running at:

  http://localhost:8000/

Note that the development build is not optimized.
To create a production build, use npm run build.
```
在浏览器里打开 http://localhost:8000 ，你会看到 dva 的欢迎界面。
此时目录结构为：
``` js
|- mock
|- node_modules
|- public
|- src
    |- asserts
    |- components
    |- models
    |- routes
    |- services
    |- utils
    |- router.js
    |- index.js
    |- index.css
|- .editorconfig
|- .eslintrc
|-  package.json
|- .roadhogrc.mock.js
|- .webpackrc
```
## 使用antd
通过 npm 安装 antd 和 babel-plugin-import 。babel-plugin-import 是用来按需加载 antd 的脚本和样式的。<br/>
注：不需要安装less或者scss。
``` js
$ npm install antd babel-plugin-import --save
```

## 使用antd-mobile
通过 npm 安装 antd-mobile 和 postcss-pxtorem 。<br/>
注：不需要安装less或者scss。

## 修改配置文件
> 将“.webpackrc”文件，更换为“.webpackrc.js”文件，并写入：
``` js
import pxtorem from 'postcss-pxtorem'; // 引入的px转rem的依赖
import config from './src/utils/config.js'; // ip地址路径，可写可不写
export default {
    entry: "src/index.js",
    disableCSSModules: false, // 注： false为开启使用css，true是为开启使用scss或者less。
    browserslist:[
        "iOS >= 8", 
        "Android >= 4"
    ],
    proxy: { // 前端反向代理
      "/v1": {
        target: 'http://' + config.ipAddr + '/v1/',
        changeOrigin: true,
        pathRewrite: { "^/v1" : "" } // 可写可不写
      }
    },
    env: {
      development: {
        extraBabelPlugins: [
          ["import", { style: true, libraryName: "antd-mobile" ,libraryDirectory: "es"}] // 注：true为开启less或者scss写法，或者使用css则写法为： style: "css"
        ],
        publicPath: "/",
        theme: {
          '@hd': '2px'
        },
        extraPostCSSPlugins: [
          pxtorem({ rootValue: 32, propWhiteList: [] })
        ]
      },
      production: {
        extraBabelPlugins: [
          ["import", { style: true, libraryName: "antd-mobile" ,libraryDirectory: "es"}]
        ],
        publicPath: "/dist/",
        theme: {
          '@hd': '2px'
        },
        extraPostCSSPlugins: [
          pxtorem({ rootValue: 32, propWhiteList: [] })
        ]
      }
    }
}
```
## 引入转换单位文件

移动端单位转换，还需在要 src/index.js中引入rem.js，其内容如下：

``` js
// 基准大小
const baseSize = 32;
// 设置 rem 函数
function setRem () {
  // 当前页面宽度相对于 1024 宽的缩放比例，可根据自己需要修改。如果设计稿是750，那就改为750, 移动端设计稿基本为750
  const scale = document.documentElement.clientWidth / 750;
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px';
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
};
```

