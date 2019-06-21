# 5 个实用的 vue 开发 tips
## 用Object.freeze()做长列表优化
> 冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。  

当我们组件只需要展示数据列表或者是纯粹的数据显示，不会有对象属性修改的操作时。我们不需要Vue来劫持我们的数据，这样能有效加快组件的渲染时间在特对数据列表过长时有明显作用。那么禁止Vue劫持数据，可以用`Object.freeze()`方法来冻结对象，一旦对象被冻结就再也不能修改对象  

``` js
export default{
    data(){
        return {
            lists: []
        }
    },
    async mounted(){
        const lists = await axios.get('/api/XXX');
        this.lists = Object.freeze(lists);
    }
}
```
冻结的意义在于不能修改对象内的值，而非不能修改vue的绑定对象的引用，我们可以采用重新赋值的方法仍然适用于我们需要refresh绑定值的时候
``` js
export default{
    data(){
        return {
            lists:[]
        }
    },
    async mounted(){
        const lists = await axios.get('/api/XXX');
        this.lists = Object.freeze(lists);
    },
    methods:{
        async refresh(){
            //it doesn't work!
            this.lists[0] = {name:'zhdarry'}
            //it works!
            this.lists = newArray;
            //当需要追加数据时 仍然可用
            this.lists = [...this.lists,{name:'zhdarry'}];
        }
    }
}
```
## Vue.observable 实现状态共享
> Vue 2.6新增API，让一个对象可响应。Vue 内部会用它来处理 data 函数返回的对象。  
返回的对象可以直接用于渲染函数和计算属性内，并且会在发生改变时触发相应的更新。也可以作为最小化的跨组件状态存储器，用于简单的场景。  

平时我们用到的跨组件状态共享的场景是引用vuex，但是如果我们的项目属于偏小型的，那么正如vuex文档所说是没有必要引入vuex增加代码复杂度和工作量的，这个时候使用observable可以完美的解决这个问题，看下用法：  
首先创建一个`store.js`，用来存储**数据**和**方法**。
``` js
//store.js
impore Vue from 'vue';
export const store  = Vue.observable({
    count:0,
    user:{
        name:"zhdarry",
        token:"XXX"
    }
})
export const mutations = {
    setCount(count){
        store.count = count;
    },
    updateUser(user){
        store.user = user;
    }
}

```
然后在某个组件中引入这个`store.js`,比如我准备修改store里的count或者更新这个登录的user
``` html
<-- Components.vue -->
<template>
    <div>
        <p>count:{{count}}</p>
        <p>userName:{{user.name}}</p>
        <button @click="setCount(count+1)">Count+1</button>
        <button @click="setCount(count-1)">Count-1</button>
        <button @click="updateUser">更新user</button>
    </div>
</template>
<script>
import {store,mutations} from '/store';
export default{
    name: 'Components',
    computed:{  //observable支持计算属性
        count(){
            return store.count;
        }
        user(){
            return store.user;
        }
    },
    methods:{
        setCount(n){
            mutations.setCount(n);
        },
        async updateUser(){
            let user = await axios.get('/api/user');
            mutations.updateUser(user);
        }
    }
}
</script>
```
## 使用v-slot作用域插槽
作用域插槽是项目中使用情况较多的场景，在vue 2.6+版本后弃用的原有的slot和slot-scope特性。  
我们在定义一组业务组件时，应当分为两部分，基础布局组件A，只负责布局，不管数据逻辑，然后另外定义一个组件B 负责数据处理，布局组件A 需要数据的时候就去 B 里面去取。假设，某一天我们的布局变了，我们只需要去修改组件A 就行，而不用去修改组件B，从而就能充分复用组件B 的数据处理逻辑。
首先我们有一个子组件用来动态绑定user的数据
``` html
<span>
    <slot v-bind:user="user">
        {{ user.lastName }}
    </slot>
</span>
```
之后在我们的父组件`current-user`中提供插槽prop名字
``` html
<current-user>
    <template v-slot:default="slotProps">
        {{ slotProps.user.firstName }}
    </template>
</current-user>
```
此外，这种还有简写写法，针对单个插槽使用，可以查看[独占插槽的缩写语法](https://cn.vuejs.org/v2/guide/components-slots.html#%E7%8B%AC%E5%8D%A0%E9%BB%98%E8%AE%A4%E6%8F%92%E6%A7%BD%E7%9A%84%E7%BC%A9%E5%86%99%E8%AF%AD%E6%B3%95)。
``` html
<current-user v-slot="slotProps">
    {{ slotProps.user.firstName }}
</current-user>
```

## 属性事件传递 $attrs 与 $listeners
在vue2.4中新增了三个api：
> **$attrs**  
包含了父作用域中不被认为 (且不预期为) props 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 props 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind=”$attrs” 传入内部组件——在创建更高层次的组件时非常有用。  

> **$listeners**  
包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on=”$listeners” 传入内部组件——在创建更高层次的组件时非常有用。  

> **inheritAttrs**
默认情况下父作用域的不被认作 props 的特性绑定 (attribute bindings) 将会“回退”且作为普通的 HTML 特性应用在子组件的根元素上。当撰写包裹一个目标元素或另一个组件的组件时，这可能不会总是符合预期行为。通过设置 inheritAttrs 到 false，这些默认行为将会被去掉。而通过 (同样是 2.4 新增的) 实例属性 $attrs 可以让这些特性生效，且可以通过 v-bind 显性的绑定到非根元素上。  
 
举个例子，A>B>C三个组件传递属性和方法，C接收到A传递过来的多个属性，A响应C处理的事件。
``` html
<!-- Components A -->
<template>
    <div>
        <child-b :attr1="attr1" :attr2="atte2" @listener1="test1()" @listener2="test2()">
            ...
        </child-b>
    </div>
</template>
<script>
    import ChildB from './ChildB';
    export default {
        data(){
            return {
                attr1: "zz",
                attr2: "rr",
            }
        },
        components:[ChildB],
        methods:{
            test1(){
                console.log("触发爷爷事件")
            },
        }
    }
</script>
```
``` html
<!-- Components B -->
<template>
    <div>
        <child-c v-bind="$attrs" v-on="$listeners">
            ...
        </child-c>
    </div>
</template>
<script>
    import ChildC from './ChildC';
    export default {
        props：["attr2"], //将接收rr
        components:{ChildC},
        inheritAttrs：false //组件传值一般是通过props传值的。inheritAttrs默认值为true，true的意思是将父组件中除了props外的属性添加到子组件的根节点上(说明，即使设置为true，子组件仍然可以通过$attr获取到props意外的属性)。
    }
</script>
```
``` html
<!-- Components C -->
<template>
    <div>
        <p>{{ attr1 }}</p> <!-- 输入zz -->
        <p>{{ attr2 }}</p> <!-- 输入rr -->
        <button click="$emit("listeners1")"></button> <!-- 向外传递方法 -->
    </div>
</template>
```
## 监听组件的生命周期
比如有父组件 Parent和子组件 Child，如果父组件监听到子组件挂载 mounted就做一些逻辑处理，常规的写法可能如下：
``` html
<!-- Parent.vue -->
<Child @mounted="doSomething" />

<!-- Child.vue -->
<template>
    ...
</template>
<script>
    mounted(){
        this.$emit("mounted");
    }
</script>
```
这里提供一种特别简单的方式，子组件不需要任何处理，只需要在父组件引用的时候通过 @hook来监听即可，适用于在某些子组件加载完成后监听反馈。代码重写如下：
``` html
<Child @hook:mounted="doSomething" />
```
这里不仅仅是可以监听 mounted，其它的生命周期事件，例如： created， updated等都可以哦！  

## 总结
这些都是vue在版本更替中为了更好满足项目需求或者更有效的提高代码性能而新增的api。大多数的前端不会去关注这些东西（我也是刚学习的），希望我们可以灵活运用到项目中去，既然项目更多简介高效，同时提升一下自己吸收新技术的能力。  
下期预告：后续可能还会做一到两期vue的分享，去学习**高阶组件**和**函数式组件**的运用。更多可能会放在一些新插件使用或者基础新代码上。



