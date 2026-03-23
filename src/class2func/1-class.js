// 面试问题：将以下代码转换成普通的构造函数写法
class Example {
  constructor(name) {
    this.name = name;
  }
  func() {
    console.log(this.name);
  }
}

// 使用class创建实例对象
const e = new Example("lee");
e.func();

// 3.遍历实例对象的属性，无方法
for (const key in e) {
  console.log("key:", key); // name
}
// 1.直接调用构造函数会报错，因为没有new关键字
// Example() // 报错
// 2.使用new关键字调用原型上的方法会报错
new Example.prototype.func(); // 报错
