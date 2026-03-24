// 节流（Throttle）高频事件触发时，固定时间间隔内只执行一次。
function throttle(func, delay) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      func.apply(this, args);
      lastTime = now;
    }
  };
}

// 定时器版
function throttleTimer(func, delay) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null; // 执行后重置
      }, delay);
    }
  };
}

// **使用场景**：
// *   滚动事件（每隔固定时间计算位置）
// *   鼠标移动（降低 mousemove 频率）
// *   游戏中的按键响应（防止连按过快）
