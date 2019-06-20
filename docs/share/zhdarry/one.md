# 7 个实用的 vue 开发 tips
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
作用域插槽是项目中使用情况较多的场景，在vue 2.6+版本后弃用的原有的slot和slot-scope特效
