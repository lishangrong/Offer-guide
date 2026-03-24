// （场景）对标30k的面试题：消除异步的传染性（大厂高级岗位必考）---react 函数式编程有的问题
// 解决方案， 去掉 async-await， 变成同步函数； --- 优化getUser函数实现, 把fetch 实现变成同步的
function getUser() {
  return fetch("./1.json");
}

function m1() {
  const user = getUser();
  // other works
  return user;
}

function m2() {
  const user = m1();
  // other works
  return user;
}

function m3() {
  const user = m2();
  // other works
  return user;
}

function main() {
  const user = m3();
  // other works
  console.log(user);
}

/**
 * 同步代码实现fetch接口请求，分2步
 * 1. 请求fetch 抛出异常
 * 2. 正常请求fetch后，重新执行 main 函数
 * @param {*} func
 */
function run(func) {
  // 1.保存旧的fetch
  const oldFetch = window.fetchch();
  // 2. 重写fetch
  const cache = {
    status: "pending", // pending fufilled, rejected
    value: null, // 结果
  };
  function newFetch(...args) {
    // 有缓存，交付缓存
    if (cache.status === "fulfilled") {
      return cache.value;
    } else if (cache.status === "rejected") {
      throw cache.value;
    }
    // 无缓存
    // 1.请求
    const p = oldFetch(...args)
      .then((res) => res.json())
      .then((data) => {
        cache.status = "fulfilled";
        cache.value = data;
      })
      .cache((e) => {
        cache.status = "rejected";
        cache.value = e;
      });
    // 2.抛出错误，中断执行
    throw p;
  }
  window.fetch = newFetch;
  // 3. 执行函数
  try {
    func();
  } catch (error) {
    if (error instanceof Promise) {
      error.finally(() => {
        window.fetch = newFetch;
        func();
        window.fetch = oldFetch;
      });
    }
  }

  // 4. 恢复 fetch
  window.fetch = oldFetch;
}

run(main);
