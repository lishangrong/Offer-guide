const obj = {
  name: "Sara",
  sayHi1: () => {
    console.log(this.name);
  },
  sayHi2() {
    (() => {
      console.log(this.name);
    })();
  },
};
obj.sayHi1();
obj.sayHi2();

const products = [
  { name: "XiaoMi", stock: 2000 },
  { name: "iphone14", stock: 1500 },
  { name: "Huawei", stock: 1300 },
];
// 上面的所有对象不可更改
// 得到一个新数组，iphone14库存减1
// 尽量用一行代码解决
const newProducts = products.map((p) =>
  p.name === "iphone14" ? { ...p, stock: p.stock - 1 } : p,
);
console.log(newProducts);


function getItems(fruitList, ...args, favoriteFruit) {
  return [...fruitList, ...args, favoriteFruit]
}
// 下面函数调用的结果是什么 --- SyntaxError: Rest parameter must be last formal parameter
getItems(['banana', 'apple'], 'pear', 'orange')