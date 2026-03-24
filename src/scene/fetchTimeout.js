// 给fetch 添加超时功能
// 思路：1.不能直接修改window.fetch，
// 2.中间封装 request(url, options),options中设置超时时间timer，但不能跨项目使用
// 3.使用高阶函数来实现
/**
 * 创建带超时功能的请求函数
 * @param {number} timeout - 超时时间（毫秒），默认3000ms
 * @returns {Function} 带超时处理的请求函数
 */
function createRequestWithTimeout(timeout = 3000) {
  // 返回一个函数，接收URL和请求选项
  return function (url, options) {
    // 返回Promise处理请求结果
    return new Promise((resolve, reject) => {
      // 创建AbortController实例，用于控制请求的取消
      const controller = new AbortController();

      // 确保options对象存在
      options = options || {};

      // 如果传入了signal，监听其abort事件，实现外部取消时也能取消内部请求
      if (options.signal) {
        options.signal.addEventListener("abort", () => {
          controller.abort();
        });
      }

      // 将controller的signal赋给options，用于控制fetch请求
      options.signal = controller.signal;

      // 设置超时定时器
      const timeId = setTimeout(() => {
        // 超时后拒绝Promise并取消请求
        reject(new Error("Request timeout"));
        controller.abort();
      }, timeout);

      // 以下是完整实现（被注释），包含清除超时定时器的逻辑
      // fetch(url, options)
      // .then((response) => {
      //   clearTimeout(timeId)
      //   resolve(response)
      // })
      // .catch((error) => {
      //   clearTimeout(timeId)
      //   reject(error)
      // })

      // 简化版实现，直接传递resolve和reject
      // 注意：此版本没有清除超时定时器，可能会导致定时器一直存在直到触发
      fetch(url, options).then(resolve, reject);
    });
  };
}
