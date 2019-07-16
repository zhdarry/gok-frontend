# React
## 安装react

> 基于create-react-app官方脚手架搭建dva模式
1. 全局安装react：**npm install create-react-app -g**
2. 创建项目，目录名为project：**create-react-app project**
3. 基本脚手架搭建完成，目录如下：

``` js
|- node_modules
|- public
|- src
    |- App.css
    |- App.js
    |- App.test.js
    |- index.css
    |- index.js
    |- logo.svg
    |- serviceWorker.js
|- .gitignore
|- package.json
|- README.md
|- yarn.lock
```

> 这就是脚手架目录，我们再来看package.json文件，如下：

``` js
{
  "name": "project",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-scripts": "3.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```
此时，可以通过**npm start**将项目运行起来，默认端口为3000

## 增加配置
> 注意scripts执行命令中有一个eject，意为弹射暴露出所有配置，其实脚手架还是为我们封装了一些东西的，这里我们就暴露出所有配置吧。<br/>
运行 **npm run eject** ，一旦选择eject，那么所封装的组件依赖和项目结构会有所变化，此时的项目结构如图：
```  js
|- config // 新增
|- node_modules
|- public
|- scripts // 新增
|- src
|- .gitignore
|- package.json
|- README.md
|- yarn.lock
```
而package.json文件内容也发生变化，如图：
```  js
{
  "name": "project",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@babel/core": "7.4.3",
    "@svgr/webpack": "4.1.0",
    "@typescript-eslint/eslint-plugin": "1.6.0",
    "@typescript-eslint/parser": "1.6.0",
    "babel-eslint": "10.0.1",
    "babel-jest": "^24.8.0",
    "babel-loader": "8.0.5",
    "babel-plugin-named-asset-import": "^0.3.2",
    "babel-preset-react-app": "^9.0.0",
    "camelcase": "^5.2.0",
    "case-sensitive-paths-webpack-plugin": "2.2.0",
    "css-loader": "2.1.1",
    "dotenv": "6.2.0",
    "dotenv-expand": "4.2.0",
    "eslint": "^5.16.0",
    "eslint-config-react-app": "^4.0.1",
    "eslint-loader": "2.1.2",
    "eslint-plugin-flowtype": "2.50.1",
    "eslint-plugin-import": "2.16.0",
    "eslint-plugin-jsx-a11y": "6.2.1",
    "eslint-plugin-react": "7.12.4",
    "eslint-plugin-react-hooks": "^1.5.0",
    "file-loader": "3.0.1",
    "fs-extra": "7.0.1",
    "html-webpack-plugin": "4.0.0-beta.5",
    "identity-obj-proxy": "3.0.0",
    "is-wsl": "^1.1.0",
    "jest": "24.7.1",
    "jest-environment-jsdom-fourteen": "0.1.0",
    "jest-resolve": "24.7.1",
    "jest-watch-typeahead": "0.3.0",
    "mini-css-extract-plugin": "0.5.0",
    "optimize-css-assets-webpack-plugin": "5.0.1",
    "pnp-webpack-plugin": "1.2.1",
    "postcss-flexbugs-fixes": "4.1.0",
    "postcss-loader": "3.0.0",
    "postcss-normalize": "7.0.1",
    "postcss-preset-env": "6.6.0",
    "postcss-safe-parser": "4.0.1",
    "react": "^16.8.6",
    "react-app-polyfill": "^1.0.1",
    "react-dev-utils": "^9.0.1",
    "react-dom": "^16.8.6",
    "resolve": "1.10.0",
    "sass-loader": "7.1.0",
    "semver": "6.0.0",
    "style-loader": "0.23.1",
    "terser-webpack-plugin": "1.2.3",
    "ts-pnp": "1.1.2",
    "url-loader": "1.1.2",
    "webpack": "4.29.6",
    "webpack-dev-server": "3.2.1",
    "webpack-manifest-plugin": "2.0.4",
    "workbox-webpack-plugin": "4.2.0"
  },
  "scripts": {
    "start": "node scripts/start.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "jest": {
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/**/*.d.ts"
    ],
    "setupFiles": [
      "react-app-polyfill/jsdom"
    ],
    "setupFilesAfterEnv": [],
    "testMatch": [
      "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
      "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
    ],
    "testEnvironment": "jest-environment-jsdom-fourteen",
    "transform": {
      "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
      "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
      "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
    },
    "transformIgnorePatterns": [
      "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
      "^.+\\.module\\.(css|sass|scss)$"
    ],
    "modulePaths": [],
    "moduleNameMapper": {
      "^react-native$": "react-native-web",
      "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
    },
    "moduleFileExtensions": [
      "web.js",
      "js",
      "web.ts",
      "ts",
      "web.tsx",
      "tsx",
      "json",
      "web.jsx",
      "jsx",
      "node"
    ],
    "watchPlugins": [
      "jest-watch-typeahead/filename",
      "jest-watch-typeahead/testname"
    ]
  },
  "babel": {
    "presets": [
      "react-app"
    ]
  }
}
```
此处我本地更改下3000端口为9999，避免与其他本地项目冲突，安装cross-env：
```  js
npm install cross-env
// 将package.json中的“scripts”的“start”，修改“start”命令为：
- "start": "node scripts/start.js", // 旧
+ "start": "cross-env PORT=9999 node scripts/start.js", // 新
```
## 安装Dva库
> dva也有自己的脚手架dva-cli，也可快速构建项目，目前已升至2.x版本，采用react-router@4.x路由版本。
```  
npm install dva --save
```
## 项目改造为dva模式
``` js
|- config
|- node_modules
|- public
|- scripts
|- src
    |- assets
    |- components
    |- models
    |- router
    |- routes
    |- services
    |- utils
|- .gitignore
|- package.json
|- README.md
|- yarn.lock
``` 