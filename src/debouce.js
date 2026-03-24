// 防抖（Debounce）高频事件触发后，延迟执行函数，若在等待期内再次触发则重新计时。

function debouce(func, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// **使用场景**：
// *   搜索框输入联想（停止输入后触发）
// *   窗口大小调整（停止调整后计算布局）
// *   按钮防重复点击
