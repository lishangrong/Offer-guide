// promise 终极面试题
Promise.resolve() // pr1
  .then(() => {
    // p0
    console.log(0);
    return Promise.resolve(4);
  })
  .then((res) => {
    console.log(res); // p4
  });

Promise.resolve() // pr2
  .then(() => {
    console.log(1); // p1
  })
  .then(() => {
    console.log(2); // p2
  })
  .then(() => {
    console.log(3); // p3
  })
  .then(() => {
    console.log(5); // p5
  })
  .then(() => {
    console.log(6); // p6
  });

/**
 * 分析过程
 * Pr1: F(状态-已完成) then方法中的函数推送值微队列
 * P0: P -- 函数还在微队列中未被执行
 * pr2: F
 * p1: P =》F
 * p2: P =》 F
 * p3: P => F
 * p4: P
 * p5: P
 * p6: P
 */

// 1.微队列： 0， 1， p4.then(() => 完成p0)
// 2.微队列 p4.then(() => 完成p0)，  2
// 3.微队列 2， () => 完成p0
// 4.微队列 () => 完成p0,  3
// 5.微队列 3, 4, 5, 6

// 控制台输出， 取出微队列中的0
// 0， 1， 2, 3, 4, 5, 6
