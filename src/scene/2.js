// （场景题）高端面试题：使用代理拦截动态属性（字节）
// 实现 add
// 分析：add 是个数组呢？还是函数呢？还是普通对象呢？
// 解题思路：读取对象的动态属性 --- 代理
const add = createProxy();
function createProxy(value = 0) {
  return new Proxy(
    {},
    {
      get(target, prop) {
        // 分析返回需求
        // const a1 = add[1] 1
        // const a2 = a1[2] 1 + 2
        // const a3 = a2[3] 1 + 2 + 3
        console.log(prop);
        // add[1][2][3] 是个对象，对象转原始
        if (prop === Symbol.toPrimitive) {
          return () => value;
        }
        return createProxy(value + Number(prop));
      },
    },
  );
}
// 让下边代码成立
const r1 = add[1][2][3] + 4; // 期望结果 10
// const r2 = add[10][20] + 30 // 期望结果 60
// const r3 = add[100][200][300] + 40 // 期望结果 1000

console.log(r1);
// console.log(r2);
// console.log(r3);
