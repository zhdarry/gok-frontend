# DVA
## dva是什么？

> dva 是体验技术部开发的 React 应用框架，将上面三个 React 工具库包装在一起，简化了 API，让开发 React 应用更加方便和快捷。

dva = React-Router + Redux + Redux-saga

截止 2017.1，最流行的社区 React 应用架构方案如下。

路由： React-Router
架构： Redux
异步操作： Redux-saga
缺点：要引入多个库，项目结构复杂。

# dva 应用的最简结构
``` js
import dva from 'dva';
const App = () => <div>Hello dva</div>;

// 创建应用
const app = dva();
// 注册视图
app.router(() => <App />);
// 启动应用
app.start('#root');
```

# 数据流图
![An image](./dataliu.png)

# 核心概念
● State：一个对象，保存整个应用状态
● View：React 组件构成的视图层
● Action：一个对象，描述事件
connect 方法：一个函数，绑定 State 到 View
dispatch 方法：一个函数，发送 Action 到 State

