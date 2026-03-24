const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

// promise 构造器
class MyPromise {
  // # 私有属性， 外部不能访问
  #state = PENDING;
  #result = undefined;
  // 队列
  #thenable = [];
  constructor(executor) {
    const resolve = (data) => {
      this.#changState(FULFILLED, data);
    };
    const reject = (err) => {
      this.#changState(REJECTED, err);
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  #changState(state, result) {
    if (this.#state !== PENDING) return;
    this.#state = state;
    this.#result = result;
    // 状态改变，处理队列
    this.#run();
  }
  #handleCallback(callback, resolve, reject) {
    if (typeof callback !== "function") {
      // 状态穿透-放入微队列
      queueMicrotask(() => {
        const setted = this.#state === FULFILLED ? resolve : reject;
        setted(this.#result);
      });
    } else {
      queueMicrotask(() => {
        try {
          const data = callback(this.#result);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
    }
  }

  #run() {
    if (this.#state === PENDING) return;
    while (this.#thenable.length) {
      // 队列-先进先出
      const { onFulfilled, onRejected, resolve, reject } =
        this.#thenable.shift();
      if (this.#state === FULFILLED) {
        // 执行 onFulfilled
        this.#handleCallback(onFulfilled, resolve, reject);
      } else {
        // 执行 onRejected
        this.#handleCallback(onRejected, resolve, reject);
      }
    }
  }
  // 1.参数(参数类型) 以及 返回类型
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#thenable.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      });

      // 启动队列处理
      this.#run();
    });
  }
}
