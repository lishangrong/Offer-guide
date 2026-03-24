// promise 状态吸收：2个步骤-- 1.准备 2.吸收
/**
 * p1, p2 其中一个promise 要吸收另一个 promise的状态
 * 下列是P2 吸收 P1的状态
 */
const p1 = new Promise((resolve) => {
  resolve();
});
const p2 = new Promise((resolve) => {
  resolve(p1);
});
console.log(p1);
console.log(p2);

async function async1() {
  console.log(1);
  await async2();
  console.log("AAA");
}

async function async2() {
  return Promise.resolve(2);
}
// function async2() {
//   return Promise.resolve(2)
// }
async1();
Promise.resolve()
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(4);
  })
  .then(() => {
    console.log(5);
  });

// async2 函数有 async关键字和没有的区别，执行顺序

console.log("-------");
