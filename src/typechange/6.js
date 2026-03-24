// 内存泄漏：有垃圾没有被回收
//
/**
 * JS中的计时器精准吗？为什么？
 * 从以下4个方面回答
 * 1、硬件 不支持精确计时（目前只有【原子钟】能实现精确计时）
 * 2、系统 - 操作系统 不同的操作系统实现方式不一样，
 *  setTimeout， setInterval
 * 3、标准 - web标准  setTimeout嵌套 >=5 层，至少有4ms 的延迟
 * 4、事件循环（现在说法：微队列，其他队列）
 *  计时队列
 */

for (var i = 0; i < 10; i++) {
  (function (j) {
    setTimeout(() => {
      console.log(j);
    }, j * 1000);
  })(i);
}

for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, i * 1000);
}
