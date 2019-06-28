# JavaScript

## 1. JavaScript 复杂判断写法

### 前提

> 我们编写 js 代码时经常遇到复杂逻辑判断的情况，通常大家可以用 if/else 或者 switch 来实现多个条件判断，但这样会有个问题，随着逻辑复杂度的增加，代码中的 if/else/switch 会变得越来越臃肿，越来越看不懂，那么如何更优雅的写判断逻辑，本文带你试一下。

### 举个栗子

```js
const onButtonClick = status => {
  if (status == 1) {
    sendLog('processing')
    jumpTo('IndexPage')
  } else if (status == 2) {
    sendLog('fail')
    jumpTo('FailPage')
  } else if (status == 3) {
    sendLog('fail')
    jumpTo('FailPage')
  } else if (status == 4) {
    sendLog('success')
    jumpTo('SuccessPage')
  } else if (status == 5) {
    sendLog('cancel')
    jumpTo('CancelPage')
  } else {
    sendLog('other')
    jumpTo('Index')
  }
}
```

通过代码可以看到这个按钮的点击逻辑：根据不同活动状态做两件事情，发送日志和跳转到对应页面，大家可以很轻易的提出这段代码的改写方案，switch 出场：

```js
const onButtonClick = status => {
  switch (status) {
    case 1:
      sendLog('processing')
      jumpTo('IndexPage')
      break
    case 2:
    case 3:
      sendLog('fail')
      jumpTo('FailPage')
      break
    case 4:
      sendLog('success')
      jumpTo('SuccessPage')
      break
    case 5:
      sendLog('cancel')
      jumpTo('CancelPage')
      break
    default:
      sendLog('other')
      jumpTo('Index')
      break
  }
}
```

嗯，这样看起来比 if/else 清晰多了，细心的同学也发现了小技巧，case 2 和 case 3 逻辑一样的时候，可以省去执行语句和 break，则 case 2 的情况自动执行 case 3 的逻辑。

还有更简单的写法：

```js
const actions = {
  '1': ['processing', 'IndexPage'],

  '2': ['fail', 'FailPage'],

  '3': ['fail', 'FailPage'],

  '4': ['success', 'SuccessPage'],

  '5': ['cancel', 'CancelPage'],

  default: ['other', 'Index']
}

const onButtonClick = status => {
  let action = actions[status] || actions['default'],
    logName = action[0],
    pageName = action[1]
  sendLog(logName)
  jumpTo(pageName)
}
```

上面代码确实看起来更清爽了，这种方法的聪明之处在于：将判断条件作为对象的属性名，将处理逻辑作为对象的属性值，在按钮点击的时候，通过对象属性查找的方式来进行逻辑判断，这种写法特别适合一元条件判断的情况。

是不是还有其他写法呢？有的：

```js
const actions = new Map([
  [1, ['processing', 'IndexPage']],

  [2, ['fail', 'FailPage']],

  [3, ['fail', 'FailPage']],

  [4, ['success', 'SuccessPage']],

  [5, ['cancel', 'CancelPage']],

  ['default', ['other', 'Index']]
])

const onButtonClick = status => {
  let action = actions.get(status) || actions.get('default')
  sendLog(action[0])
  jumpTo(action[1])
}
```

这样写用到了 es6 里的 Map 对象，是不是更爽了？Map 对象和 Object 对象有什么区别呢？

一个对象都有自己的原型，所以一个对象总有一个"prototype"键。
一个对象的键只能是字符串或者 Symbols，但一个 Map 的键可以是任意值。Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。
你可以通过 size 属性很容易地得到一个 Map 的键值对个数，而对象的键值对个数只能手动确认。

我们需要把问题升级一下，以前按钮点击时候只需要判断 status，现在还需要判断用户的身份：

```js
/**
 * 按钮点击事件
 * @param {number} status 活动状态：1开团进行中 2开团失败 3 开团成功 4 商品售罄 5 有库存未开团
 * @param {string} identity 身份标识：guest客态 master主态
 */
const onButtonClick = (status, identity) => {
  if (identity == 'guest') {
    if (status == 1) {
      //do sth
    } else if (status == 2) {
      //do sth
    } else if (status == 3) {
      //do sth
    } else if (status == 4) {
      //do sth
    } else if (status == 5) {
      //do sth
    } else {
      //do sth
    }
  } else if (identity == 'master') {
    if (status == 1) {
      //do sth
    } else if (status == 2) {
      //do sth
    } else if (status == 3) {
      //do sth
    } else if (status == 4) {
      //do sth
    } else if (status == 5) {
      //do sth
    } else {
      //do sth
    }
  }
}
```

每个判断里的具体逻辑了就不写了，因为代码太冗长了。

从上面的例子我们可以看到，用 if/else 写,会出现大段的逻辑判断,当你的逻辑升级为二元判断时，你的判断量会加倍，你的代码量也会加倍，这时怎么写更清爽呢？

```js
const actions = new Map([
  const actions = new Map([
  ['guest_1', ()=>{/*do sth*/}],
  ['guest_2', ()=>{/*do sth*/}],
  ['guest_3', ()=>{/*do sth*/}],
  ['guest_4', ()=>{/*do sth*/}],
  ['guest_5', ()=>{/*do sth*/}],
  ['master_1', ()=>{/*do sth*/}],
  ['master_2', ()=>{/*do sth*/}],
  ['master_3', ()=>{/*do sth*/}],
  ['master_4', ()=>{/*do sth*/}],
  ['master_5', ()=>{/*do sth*/}],
  ['default', ()=>{/*do sth*/}],
])

const onButtonClick = (identity, status) => {
  let action = actions.get(`${identity}_${status}`) || actions.get('default')
  action.call(this)
}
```

上述代码核心逻辑是：把两个条件拼接成字符串，并通过以条件拼接字符串作为键，以处理函数作为值的 Map 对象进行查找并执行，这种写法在多元条件判断时候尤其好用。

当然上述代码如果用 Object 对象来实现也是类似的：

```js
const actions = {
  guest_1: () => {
    /*do sth*/
  },
  guest_2: () => {
    /*do sth*/
  }
  //....
}

const onButtonClick = (identity, status) => {
  let action = actions[`${identity}_${status}`] || actions['default']
  action.call(this)
}
```

如果有些同学觉得把查询条件拼成字符串有点别扭，那还有一种方案，就是用 Map 对象，以 Object 对象作为 key：

```js
const actions = new Map([
  [
    { identity: 'guest', status: 1 },
    () => {
      /*do sth*/
    }
  ],
  [
    { identity: 'guest', status: 2 },
    () => {
      /*do sth*/
    }
  ]
  //...
])

const onButtonClick = (identity, status) => {
  let action = [...actions].filter(
    ([key, value]) => key.identity == identity && key.status == status
  )
  action.forEach(([key, value]) => value.call(this))
}
```

是不是又高级了一点点？
这里也看出来 Map 与 Object 的区别，Map 可以用任何类型的数据作为 key。
我们现在再将难度升级一点点，假如 guest 情况下，status1-4 的处理逻辑都一样怎么办，最差的情况是这样：

```js
const actions = new Map([
  [
    { identity: 'guest', status: 1 },
    () => {
      /* functionA */
    }
  ],
  [
    { identity: 'guest', status: 2 },
    () => {
      /* functionA */
    }
  ],
  [
    { identity: 'guest', status: 3 },
    () => {
      /* functionA */
    }
  ],
  [
    { identity: 'guest', status: 4 },
    () => {
      /* functionA */
    }
  ],
  [
    { identity: 'guest', status: 5 },
    () => {
      /* functionB */
    }
  ]
  //...
])
```

好一点的写法是将处理逻辑函数进行缓存：

```js
const actions = () => {
  const functionA = () => {
    /*do sth*/
  }
  const functionB = () => {
    /*do sth*/
  }
  return new Map([
    [{ identity: 'guest', status: 1 }, functionA],
    [{ identity: 'guest', status: 2 }, functionA],
    [{ identity: 'guest', status: 3 }, functionA],
    [{ identity: 'guest', status: 4 }, functionA],
    [{ identity: 'guest', status: 5 }, functionB]
    //...
  ])
}

const onButtonClick = (identity, status) => {
  let action = [...actions()].filter(
    ([key, value]) => key.identity == identity && key.status == status
  )
  action.forEach(([key, value]) => value.call(this))
}
```

这样写已经能满足日常需求了，但认真一点讲，上面重写了 4 次 functionA 还是有点不爽，假如判断条件变得特别复杂，比如 identity 有 3 种状态，status 有 10 种状态，那你需要定义 30 条处理逻辑，而往往这些逻辑里面很多都是相同的，这似乎是我们不想接受的，那可以这样实现:

```js
const actions = () => {
  const functionA = () => {
    /*do sth*/
  }
  const functionB = () => {
    /*do sth*/
  }
  return new Map([
    [/^guest_[1-4]$/, functionA],
    [/^guest_5$/, functionB]
    //...
  ])
}

const onButtonClick = (identity, status) => {
  let action = [...actions()].filter(([key, value]) =>
    key.test(`${identity}_${status}`)
  )
  action.forEach(([key, value]) => value.call(this))
}
```

这里 Map 的优势更加凸显，可以用正则类型作为 key 了，这样就有了无限可能，假如需求变成，凡是 guest 情况都要发送一个日志埋点，不同 status 情况也需要单独的逻辑处理，那我们可以这样写:

```js
const actions = () => {
  const functionA = () => {
    /*do sth*/
  }
  const functionB = () => {
    /*do sth*/
  }
  const functionC = () => {
    /*send log*/
  }
  return new Map([
    [/^guest_[1-4]$/, functionA],
    [/^guest_5$/, functionB],
    [/^guest_.*$/, functionC]
    //...
  ])
}

const onButtonClick = (identity, status) => {
  let action = [...actions()].filter(([key, value]) =>
    key.test(`${identity}_${status}`)
  )
  action.forEach(([key, value]) => value.call(this))
}
```

也就是说利用数组循环的特性，符合正则条件的逻辑都会被执行，那就可以同时执行公共逻辑和单独逻辑，因为正则的存在，你可以打开想象力解锁更多的玩法，本文就不赘述了。

### 总结

本文已经教你了 8 种逻辑判断写法，包括：

1. if/else
2. switch
3. 一元判断时：存到 Object 里
4. 一元判断时：存到 Map 里
5. 多元判断时：将 condition 拼接成字符串存到 Object 里
6. 多元判断时：将 condition 拼接成字符串存到 Map 里
7. 多元判断时：将 condition 存为 Object 存到 Map 里
8. 多元判断时：将 condition 写作正则存到 Map 里

至此，本文也将告一段落，愿你的代码里，不只是有 if/else/switch。

## 2. Set 让你的代码运行的更快

### 前提

在这篇文章，我们将要讨论如何利用 JS 的 Set 对象让你的代码运行的更快——尤其是在它所处理的数据量大的时候。Array 和 Set 在处理数据时，两则有太多的相似。但是使用 Set 所带来的运行时优势，是 Array 无法完成的。

### <font color=orange> Set 有何不同？</font>

根本的区别就是 Array 是 索引集合（index collection）。这意味着，数据的值是以 索引（index） 排序的。

```js
const arr = [A, B, C, D]

console.log(arr.indexOf(A)) // Result: 0

console.log(arr.indexOf(C)) // Result: 2
```

而 Set 则是 键集合（keyed collection）。相比使用 索引，Set 使用 键 来组织它的数据。一个 Set 中所有项都是按插入顺序可迭代的，它不会有重复值。换句话说，Set 中的每一项都是独一无二的。

### <font color=orange> 最主要的收益是什么？</font>

Set 相比 Array 有些优势，特别是考虑到需要更快的运行时间：

- 查找项: 使用 indexOf() 或 includes() 去检查一个项是否在数组中很慢。

- 删除项: 在 Set 中，你可以使用 值 去删除一项。而在 Array 中，相同的功能需要使用项的 索引 使用 splice()方法。使用 索引 是很慢的

- 插入项: 在 Set 中新增一项比 Array 使用 push() 或者 unshift() 等方法新增一项要快的多。

- 排序 NaN 值: 你无法使用 Array 的 indexOf() 或者 includes() 去定位 NaN 值，但是 Set 可以并且能够存储这个值

- 去重: Set 对象只存储独一无二的值，如果你想避免储存重复值，这是比 Array 更好的选择，因为使用 Array，你需要使用额外的代码去处理这种情况。

### <font color=orange> 什么是时间复杂度？</font>

使用 Array 去查找是一个为 O(N) 的线性时间复杂度。换句话说，随着数据量的提高，运行时间随着增加。

相比而言，使用 Set 去查找，不管是删除还是插入的时间复杂度都仅仅是 O(1)——这意味着，运行时间不随着数量的提高而增加。

### <font color=orange> 那么 Set 究竟有多快呢？</font>

虽然运行时间受使用的操作系统、数据的大小和其它的一些变量的影响，我希望我的测试结果能让你对 Set 的速度有个直观的感受。

### <font color=orange> 准备测试 </font>

在开始运行之前，我们简单的将 Array 和 Set 填充 1000000 个值（0~999999）

```js
let arr = [],
  set = new Set(),
  n = 1000000

for (let i = 0; i < n; i++) {
  arr.push(i)

  set.add(i)
}
```

### <font color=orange> 测试 1：查找 </font>

查找值 123123:

```js
let result

console.time('Array')

result = arr.indexOf(123123) !== -1

console.timeEnd('Array')

console.time('Set')

rusult = set.has(123123)

console.timeEnd('Set')
```

输出

- Array: 0.25ms
- Set: 0.02490234375ms
- 快了将近 10 倍

### <font color=orange> 测试 2: 新增 </font>

新增一个值，变量为 n：

```js
console.time('Array')

arr.push(n)

console.timeEnd('Array')

console.time('Set')

set.add(n)

console.timeEnd('Set')
```

输出

- Array: 0.018ms
- Set: 0.003ms
- 快了将近 7 倍

### <font color=orange> 测试 3：删除 </font>

最后，我们删除一项（就删除我们刚新增的）。因为 Array 没有原生删除方法，我们写一个 helper 来完成这个功能：

```js
const deleteFromArr = (arr, item) = > {

    let index = arr.indexOf(item);

    return index !== -1 && arr.splice(index, 1);

}
console.time('Array');

deleteFromArr(arr, n);

console.timeEnd('Array');

console.time('Set');

set.delete(n);

console.timeEnd('Set');
```

输出

- Array: 1.122ms
- Set: 0.015ms
- 快了将近 75 倍

总体来说，我们可以看到在运行时间上，Set 相比 Array 优势巨大。

### <font color=orange> 数组去重 </font>

```js
const duplicateCollection = ['A','B','B','C',''D','B','E'];

//如果你想把 Array 转成 Set

let uniqueCollection = new Set(duplicateCollection);

console.log(uniqueCollection) //Set(4) {"A","B","C","D"};

//如果你想让你的值仍是`Array`

let uniqueCollection = [...new Set(duplicateCollection)];

console.log(uniqueCollection)//["A","B","C","D"]
```
