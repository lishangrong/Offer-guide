// 阿里面试题  考察赋值运算
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };

console.log(a.x);
console.log(b.x);

// 不要想太多题目
const obj = {
  flag: "Json",
  func: function () {
    console.log(this);
    console.log(this.flag);
  },
};

const p = new Proxy(obj, {});
p.func();
obj.func();
