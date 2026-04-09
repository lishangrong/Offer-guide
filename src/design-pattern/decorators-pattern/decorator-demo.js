// 1. 安装设置【babel-plugin-transform-decorators-legacy】

// // 语法演示
// function testDec(target) {
//   target.isDec = true
// }
// @testDec
// class Demo {}
// alert(Demo.isDec)


// //  示例演示(参数形式)
// function testDeco(isDec) {
//   return function(target) {
//     target.isDec = isDec
//   }
// }
// @testDeco(false)
// class DecDmo{}
// alert(DecDmo.isDec)

// // 示例演示-mixin
// function mixins(...list) {
//   return function(target) {
//     Object.assign(target.prototype, ...list)
//   }
// }
// const Foo = {
//   foo() {
//     alert('foo')
//   }
// }
// @mixins(Foo)
// class MyClass{}
// let obj = new MyClass()
// obj.foo()

// 示例演示-装饰方法
function readonly(target, name, descriptor ) {
  // descriptor 属性描述对象(Object.defineProperty 中会用到),原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // }
  descriptor.writable = false
  return descriptor
}
class Person {
  constructor() {
    this.first = 'A'
    this.last = 'B'
  }
  @readonly
  name() {
    return `${this.first} ${this.last}`
  }
}

const p = new Person()
console.log(p.name());
p.name = function() {
  alert(100)
} // 应该报错


// 实例演示-装饰方法
function log(target, name, descriptor){
  let oldValue = descriptor.value
  descriptor.value = function() {
    console.log(`Call ${name} with`, arguments);
    return oldValue.apply(this, arguments)
  }

  return descriptor
}

class Math {
  @log
  add (a, b) {
    return a + b
  }
}

const math = new Math()
const result = math.add(2, 3) // 执行add时，会自动打印日志，因为log装饰器
console.log('result', result);

