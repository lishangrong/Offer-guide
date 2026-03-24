/**
 * 运行一个耗时任务
 * 如果要一步执行任务，请返回Promise
 * 要尽快完成任务，同时不要让页面产生卡顿
 * 尽量兼容更多的浏览器
 */
function runTask(task) {
  return new Promise((resolve) => {
    // setTimeout(() => {
    //   task()
    //   resolve()
    // }, 0)
    // _runTask(task, resolve)
    _runTask2(task, resolve);
  });
}
function _runTask(task, callback) {
  requestIdleCallback((deadline) => {
    if (deadline.timeRemaining() > 0) {
      task();
      callback();
    } else {
      _runTask(task, callback);
    }
  });
}
// 耗时长了但兼容性更好，浏览器的刷新频率是60Hz，即16.6ms刷新一次
function _runTask2(task, callback) {
  const startTime = Date.now();
  requestAnimationFrame(() => {
    if (Date.now() - startTime < 16.6) {
      task();
      callback();
    } else {
      _runTask2(task, callback);
    }
  });
}
// 页面有个动画一直运行，任务执行时，希望不要影响动画运行
// 同步，阻塞：任务执行时，页面会卡顿，影响用户体验
// 异步-微队列：页面停止动画，影响页面展示
// 异步-宏队列：setTimeout 动画没有停止，但有卡顿，safari浏览器会阻塞
