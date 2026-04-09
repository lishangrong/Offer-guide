// 迭代器模式：顺序访问一个集合，使用者无需知道集合的内部结构（封装）
// 示例：test3.html
// 实际场景: jQuery each, ES6 Iterator
/**
 * ES6 Iterator 为何存在：
 * ES6语法中，有序集合的数据类型已经有很多，如：Array, Map, Set, String, TypedArray, arguments, NodeList
 * 需要有一个统一的遍历接口来遍历所有数据类型(注意：object不是有序集合，可以用Map代替)
 * 
 */

/**
 * ES6 Iterator 是什么
 * 以上数据类型，都有 [Symbol.iterator]属性，属性值是函数，执行函数返回一个迭代器
 * 这个迭代器就有next方法可以顺序迭代子元素
 * 可运行 Array.prototype[Symbol.iterator]来测试
 * 
 */

/**
 * ES6 Iterator 与 Generator
 * Iterator 的价值不限于上述几个类型的遍历，还有Generator 函数的使用
 * 即只要返回的数据符合 Iterator 接口的要求， 即可使用Iterator语法，这就是迭代器模式
 * 
 */

class Iterator {
  constructor(container){
    this.list = container.list
    this.index = 0
  }
  next() {
    if (this.hasNext()){
      return this.list[this.index++]
    }
    return null
  }

  hasNext() {
    if (this.index >= this.list.length){
      return false
    }
    return true
  }
}

class Container {
  constructor(list) {
    this.list = list
  }

  getIterator() {
    return new Iterator(this)
  }
}

// 测试代码
let arr = [1, 2,3, 4,5, 6]
let container = new Container(arr)
let iterator = container.getIterator()
while(iterator.hasNext()){
  console.log(iterator.next());
}

// -----------ES6 Iterator 示例 ---------
// 实际使用： for-of

function each (data) {
  // 生成遍历器
  // let iterator = data[Symbol.iterator]()
  // console.log(iterator.next());
  // console.log(iterator.next());
  // console.log(iterator.next());
  // console.log(iterator.next());
  // console.log(iterator.next());
  // console.log(iterator.next());
  // console.log(iterator.next());
  // let item = {done: false}
  // while(!item.done){
  //   item = iterator.next()
  //   if (!item.done){
  //     console.log(item.value, item.done);
  //   }
  // }

  for (const item of data) {
    console.log(item);
  }
}
let nodeList = document.getElementsByTagName('p')
let m = new Map()
m.set('a', 100)
m.set('b', 200)

each(m)
// each(arr)
each(nodeList)

// ------Generator ------
console.log('generator-iterator');
function* helloWorldGenerator() {
  yield 'hello'
  yield 'world'
  yield 'ending'
}

let hw = helloWorldGenerator()
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
for (const v of helloWorldGenerator()) {
  console.log(v);
}