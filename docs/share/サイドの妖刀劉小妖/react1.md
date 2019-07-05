# React

> Dva可以理解是React的一个轻量级框架，它呢是基于redux、redux-saga、react-router的一个数据流方案，当然了有些同学肯定会问什么是redux？redux-saga又是什么？当然了还有些比较认真的同学还会研究啥是数据流方案？
  redux就是React的一个可预测化的数据状态管理，啥意思呢？就是输入一个得到一个，这就是可以预测的。
  redux-saga其实就是redux的一个管理异步操作的中间件，它使用了 ES6 的 Generator 功能，让异步的流程更易于读取，写入和测试。

双向数据流方案：vue + vue-router + vuex

单向数据流方案：react-router + redux + redux-saga

### 初始化Dva项目

```
yarn global add dva-cli 或 npm install -g dva-cli

cd your-porjectFile

dva init
```

### 项目文件说明

```
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
mock 存放用于 mock 数据的文件；<br>
public 一般用于存放静态文件，打包时会被直接复制到输出目录(./dist)；<br>
src 文件夹用于存放项目源代码；<br>

asserts 用于存放静态资源，打包时会经过 webpack 处理；<br>
components 用于存放 React 组件，一般是该项目公用的无状态组件；<br>
models 用于存放模型文件<br>
routes 用于存放需要 connect model 的路由组件；<br>
services 用于存放服务文件，一般是网络请求等；<br>
utils 工具类库<br>
router.js 路由文件<br>
index.js 项目的入口文件<br>
index.css 一般是共用的样式<br>


.editorconfig 编辑器配置文件<br>
.eslintrc ESLint配置文件<br>
.gitignore Git忽略文件<br>
.roadhogrc.mock.js Mock配置文件<br>
.webpackrc 自定义的webpack配置文件，JSON格式，如果需要 JS 格式，可修改为 .webpackrc.js<br>

其中最重要的就是routes跟models文件，咱们在开发react项目的时候，常常会把组件按照规范开发划分清楚，比如components就是咱们的无状态组件，通常只接受属性单纯滴展示，换而言之routes就是有状态的组件，有state，也接受属性等等，所以开发中一定得规范化。models就是咱得业务层，数据层，里面就是咱的数据方案集中中心，redux跟redux-saga在这儿起着举足轻重得作用，那么在连接组件与模型得桥梁就是dva提供的connect方法。

### 数据流向

数据的改变发生通常是通过用户交互行为或者浏览器行为（如路由跳转等）触发的，当此类行为会改变数据的时候可以通过 dispatch 发起一个 action，如果是同步行为会直接通过 Reducers 改变 State ，如果是异步行为（副作用）会先触发 Effects 然后流向 Reducers 最终改变 State，所以在 dva 中，数据流向非常清晰简明。

![An image](./lifeCycle.png)


### 剖析模型(models文件)

``` js
import { query } from "../services/example";
export default {

  namespace: 'example',

  state: {
    user: 1,
    age: '18'
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/') {
          // talk is cheap, show me your code
        }
      })
    }
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const res =yield call(query, payload);
      yield put({
        type: 'save',
        payload: res
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload
      };
    },
  },

};


```

#### state

models中的state就是单个模块的一个数据集，只能通过组件去走action方式去同步或者异步去更新state，从而再通过state再更新组件，所以models中的state要保持独立性，才方便我们对数据有一个很好的把控追踪。

#### action

action 是一个普通 javascript 对象，它是改变 state 的唯一途径。无论是从 UI 事件、网络回调，还是 WebSocket 等数据源所获得的数据，最终都会通过 dispatch 函数调用一个 action，从而改变对应的数据。action 必须带有 type 属性指明具体的行为，其它字段可以自定义，如果要发起一个 action 需要使用 dispatch 函数；需要注意的是 dispatch 是在组件 connect Models以后，通过 props 传入的。

#### dispatch

dispatching function 是一个用于触发 action 的函数，action 是改变 State 的唯一途径，但是它只描述了一个行为，而 dipatch 可以看作是触发这个行为的方式，而 Reducer 则是描述如何改变数据的。

在 dva 中，connect Model 的组件通过 props 可以访问到 dispatch，可以调用 Model 中的 Reducer 或者 Effects，常见的形式如：

``` js
dispatch({
    type: 'example/fetch',
    payload: { id: 1 }
})
```

#### reducer

``` js
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload
      };
    },
  }
```

reducer就是通过参数action来同步更新models里面的state数据状态，就只接受两个参数，第一个是之前已经运算过的state和当前运算的结果，最终整合成一个新得运算结果。

#### effect

``` js
effects: {
    * fetch({ payload }, { call, put }) {
      const res =yield call(query, payload);
      yield put({
        type: 'save',
        payload: res
      });
    },
  },
```

effect就是通过异步操作（网络接口获取数据）更新state，只是在effect中是通过generator来将异步写法转换成了同步写法（<a href="https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch3.html#%E8%BF%BD%E6%B1%82%E2%80%9C%E7%BA%AF%E2%80%9D%E7%9A%84%E7%90%86%E7%94%B1" target="_blank">戳我了解为什么需要尽量将异步转换成同步的纯函数写法</a>）

dva 提供多个 effect 函数内部的处理函数，比较常用的是 call 和 put，还有一个select。

call：执行异步函数

put：发出一个 action，类似于 dispatch

select：就是获取state的数据 yield select(state => state.user);

#### subscription

Subscription 语义是订阅，用于订阅一个数据源，然后根据条件 dispatch 需要的 action。数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等，其实就是监听器。


### 剖析组件(routes文件)

#### 组件创建方式
#### 1、无状态组件（函数式）

创建纯展示组件，只负责根据传入的props来展示，不涉及state状态的操作，是一个只带有一个render方法的组件类

``` js
import React from 'react';

const Example = ({ name }) => {
  return (
    <div>
      { name }
    </div>
  );
};

Example.propTypes = {

};

export default Example;

```

#### 2、React.Component（Class写法）
React.Component是以ES6的形式来创建react的组件的，是React目前极为推荐的创建有状态组件的方式，可以更好地实现代码复用。

``` js
import React from 'react';
import { connect } from 'dva';
import './IndexPage.css';
import Example from '../../components/Example'

@connect(({ example }) => ({
  example,
}))
export default class IndexPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '小明明'
    };
  }
  componentDidMount () {
    const { dispatch } = this.props;
    dispatch({ type: 'example/fetch', payload: { id: 1 }})
  }
  render () {
    return (
      <div>
        <h1>Hello World</h1>
        <p>一起来学习吧</p>
        <Example name={this.state.name}/>
      </div>
    )
  }
}
IndexPage.propTypes = {

};

```
通过创建组件的代码，大家可以看出一个类型检测实列propTypes，只需要引入prop-types库即可；
更多了解请戳 <a href="https://react.docschina.org/docs/typechecking-with-proptypes.html" target="_blank">https://react.docschina.org/docs/typechecking-with-proptypes.html</a>，嘻嘻嘻嘻

``` js
import PropTypes from 'prop-types';
............
Example.propTypes = {
  name: PropTypes.string, // 传入类型字符串
  // name: PropTypes.string.isRequired, // 传入属性必传
};
```

通过解析一个有状态的组件，分析组件各个组成部分：

#### 1、 constructor 构造函数
constructor 是一种用于创建和初始化class创建的对象的特殊方法，在一个类里面有且只能有一个constructor，通过super关键字来调用一个父类的构造方法，若没有故意去写一个构造函数，那么会使用默认的构造函数（(ˉ▽ˉ；)...）

#### 2、 生命周期函数
每个生命周期都有相对应的函数钩子与执行逻辑，请猛戳 <a href="https://react.docschina.org/docs/react-component.html" target="_blank">https://react.docschina.org/docs/react-component.html</a> 进行学习，加油你可以的

#### 3、connect函数
connect的作用是将组件和models结合在一起。将models中的state绑定到组件的props中。并提供一些额外的功能，譬如dispatch。
具体使用呢其实就是这样得：

``` js
import { connect } from 'dva';

// =========== 未使用装饰器 ===========

function mapStateToProps (state) { // 将models的state绑定到props
  const example = state.example;
  return {
    example
  }
}

function mapDispatchToProps (dispatch) { // 通过dispatch访问models中的effects或者reducer
  return {
    fetch: () => dispatch({
      type: 'example/fetch'
    })
  }
}

export default connect( mapStateToProps, mapDispatchToProps ) (IndexPage); // 连接组件跟models


// =========== 装饰器 ================

import { connect } from 'dva';

@connect(({ example }) => ({ // 通过传入对应models的命名，得到一个新得对象，绑定了state与props
    example
}))

componentDidMount () { // 通过dispatch触发action更新state从而更新组件
    const { dispatch } = this.props;
    dispatch({ type: 'example/fetch', payload: { id: 1 }})
}

export default class IndexPage extends React.Component { }
```

### 总结

上面讲的都是dva搭建react项目的基础知识，但是都是最实用最重要的地方，记住那个流程图，搞清楚数据的流向，多看看react相关API，总而言之，言而总之，talk is cheap，show me the code。

由于时间匆忙，本次分享到这儿就差不多了，后面我会自己做一个react微信端的一个个人公众号，方便学习，后面的代码我会自己悄悄更新上来，大家有空可以来看看代码。周末愉快！O(∩_∩)O
