// 闭包
function test() {
  var arr = [];
  for (var index = 0; index < 10; index++) {
    (function (j) {
      arr[j] = function () {
        console.log(j);
        document.writeln(j + " ");
      };
    })(index);
  }
  return arr;
}

var myArr = test();
myArr.forEach((item) => item());

// 闭包的应用场景？
// 1. 私有变量
// 2. 事件监听
// 3. 模块模式
//  闭包优缺点？
//  优点：私有变量，事件监听，模块模式
//  缺点：内存泄漏，  闭包会占用内存，不及时释放，会导致内存泄漏
//  解决方案：及时释放闭包，或者使用 WeakMap 存储闭包 ，WeakMap 会自动回收闭包占用的内存
