// 让以下代码成立
var [a, b] = {
  a: 3,
  b: 4,
};
console.log(a, b); // 3, 4

// 解决方案，运行代码，根据错误提示， =右侧 变成可迭代对象, 不改动源代码的前提下，可以改动对象原型

// 理解结构赋值底层原理
// const arr = [3, 4]
// const [a, b] = arr
// const iter = arr[Symbol.iterator]()
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());

// 实现方法1
Object.prototype[Symbol.iterator] = function () {
  const arr = Object.values(this);
  return arr[Symbol.iterator]();
};

// 实现方法2
Object.prototype[Symbol.iterator] = function* () {
  yield* Object.values(this);
};
