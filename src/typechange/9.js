// （JS）判断函数是否标记为async
function isAsyncFunction(func) {
  // console.log(func instanceof AsyncFunction); // ReferenceError: AsyncFunction is not defined
  console.log(Object.prototype.toString.call(func));
  console.log(func.constructor.name);
  return Object.prototype.toString.call(func) === "[object AsyncFunction]";
  // return func.constructor.name === 'AsyncFunction'
}
console.log(isAsyncFunction(() => {})); // false
console.log(isAsyncFunction(async () => {})); // true
