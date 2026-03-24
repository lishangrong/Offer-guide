// 中国华能集团清洁能源技术研究院有限公司智慧运维与大数据部 笔试题
// 1. 编写一个 JavaScript 函数，接收一个数组作为参数，返回该数组中的最大值。
function getMaxNum(arr = []) {
  if (arr.length === 0) return undefined;
  // 方法1
  //  return Math.max(...arr);
  // 方法2
  return arr.reduce((val, cur) => {
    return val > cur ? val : cur;
  }, arr[0]);
}

console.log(getMaxNum([12, 3, 87, 9]));

// 2. 编写一个 JavaScript 函数，接收多个参数，返回参数的和
function sum(...args) {
  // return args.reduce((val, current) => val + current, 0);
  return Array.from(arguments).reduce((val, cur) => val + cur, 0);
}

console.log(sum(1, 4, 6));

// 3. 编写一个异步函数，使用 async/await 通过 fetch API 获取数据，并在获取成功后将数据打印到控制台。

async function getData(ul, options) {
  try {
    const result = await fetch(url, options);
    if (!result.ok) {
      throw new Error(`HTTP 状态码错误: ${result.status}`);
    }
    const data = result.json();
    console.log(data);
  } catch (e) {
    console.warn(e);
  }
}

// 4. 下面代码输出什么，如何进行修复
// const person = {
//   name: 'Alice',
//   greet: function() {
//     setTimeout(function() {
//       console.log('Hello, ' + this.name);
//     }, 1000);
//   }
// };
// person.greet();

// 输出 Hello,
// 修复
const person = {
  name: "Alice",
  greet: function () {
    setTimeout(() => {
      console.log("Hello, " + this.name);
    }, 1000);
  },
};
person.greet();

// 5. 使用css实现以下效果（flex）：
//  1）父容器（section）宽度为100%，高度为 100vh；
//  2）子元素（div）从上到下排列，间隔16px；
//  3）子元素（div）宽度为 300px，高度为 200px，背景色为蓝色，且在父容器中水平和垂直居中；

// 6、async 与 defer 的区别
// 1. async 与 defer 都是异步加载脚本，但是 async 是在解析 HTML 时异步加载，而 defer 是在解析 HTML 完成后异步加载。
// 2. async 可以在加载完成后执行，而 defer 只能在解析完成后执行。

// fetch request
// 使用 AbortController 中止请求：
const controller = new AbortController();
const signal = controller.signal;
fetch(
  url,
  {
    method: "POST", // GET/PUT
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer your token", // 身份验证
    },
    body: JSON.stringify(), // 数据
    mode: "cors", // 跨域模式（cors, no-cors, same-origin）
    cache: "no-cache", // 缓存策略
    credentials: "include", // 携带 Cookie（include, same-origin, omit）
  },
  { signal },
)
  .then(() => {})
  .catch(() => {});
// 取消请求
controller.abort();
