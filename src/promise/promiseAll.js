// 手写 promise.all
// 参数不能简单的认为是一个数组，它是可迭代对象
Promise.myAll = function (proms) {
  let res, rej;
  const p = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  let i = 0;
  let fulfilled = 0;
  const result = [];
  // 不能使用proms.length 判断长度，有可能是 Set等类型
  for (const prom of proms) {
    const index = i;
    i++;
    Promise.resolve(prom).then((data) => {
      // 1.完成的数据汇总到最终结果
      result[index] = data;
      // 2.判断是否全部完成
      fulfilled++;
      if (fulfilled === i) {
        res(result);
      }
    }, rej);
  }

  if (i === 0) {
    res([]);
  }
  return p;
};

Promise.myAll([1, 2, 3, Promise.resolve(999)]).then((res) => {
  console.log(res);
});

// Promise 工具方法：catch， resolve， reject
// 遵守 Promise Es 规范，查看 mdn promise 对应的规范
Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected);
};

// promiselike
function isPromiseLike(value) {
  return typeof value === "object" && typeof value.then === "function";
}

Promise.resolve = function (value) {
  if (value instanceof Promise) return value;
  // thenable 对象 遵循 Promise A+规范
  if (isPromiseLike(value)) {
    return new Promise((resolve, reject) => {
      value.then(resolve, reject);
    });
  }
  return new Promise((resolve) => resolve(value));
};

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => reject(reason));
};

// promise-微队列
function runMicroTask(fn) {
  // 判断环境-node
  if (process && process.nextTick) {
    process.nextTick(fn);
  } else if (typeof MutationObserver === "function") {
    // 浏览器 MutationObserver
    const ob = new MutationObserver(fn); // fn放入微队列
    // 创建节点，节点发生变化，执行微队列任务
    const text = document.createTextNode("1");
    ob.observe(text, { characterData: true });
    text.data("2");
  } else {
    setTimeout(fn, 0);
  }
}
