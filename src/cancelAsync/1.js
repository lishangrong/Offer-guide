// （场景）对标30k的面试题：消除异步的传染性（大厂高级岗位必考）---react 函数式编程有的问题
// 解决方案，/cancelAsync/2.js 去掉 async-await， 变成同步函数； --- 优化getUser函数实现, 把fetch 实现变成同步的
async function getUser() {
  return await fetch("./1.json");
}

async function m1() {
  const user = await getUser();
  // other works
  return user;
}

async function m2() {
  const user = await m1();
  // other works
  return user;
}

async function m3() {
  const user = await m2();
  // other works
  return user;
}

async function main() {
  const user = await m3();
  // other works
  console.log(user);
}
