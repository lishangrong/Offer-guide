// （场景题）一个必会的小面试题：动态执行JS
var a = 1;
function exec(code) {
  var a = 2;
  // 1. eval 同步，局部作用域
  // eval(code) // 都会，体现不出价值

  // 2. setTimeout 异步代码 全局作用域
  // setTimeout(code)

  // 3. 创建脚本 同步代码，全局作用域
  // const script = document.createElement('script')
  // script.innerHTML = code
  // document.body.appendChild(script)

  // 4. 创建一个函数Function 同步代码，全局作用域
  new Function(code)();
}
exec(`console.log("a", a)`);
