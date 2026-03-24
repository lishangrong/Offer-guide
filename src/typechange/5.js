// 前言
Object.is(+0, -0); // false
Object.is(NaN, NaN); // true
Object.is({}, {}); // false
/**
 * 数组去重
 * 两个属性相同的对象也认为是重复的
 * @param {Array} arr
 * @return {Array}
 */
function uniqueArray(arr) {
  // 一般情况，但满足不了题目要求
  // return [...new Set(arr)]

  const result = [];
  outer: for (const item of arr) {
    // 判断 item 在result 中是否存在
    for (const r of result) {
      if (equal(item, r)) {
        continue outer;
      }
    }
    result.push(item);
  }
  return result;
}

function isPrimitive(val) {
  return val === null || (typeof val !== "object" && typeof val !== "function");
}

function equal(val1, val2) {
  if (isPrimitive(val1) || isPrimitive(val2)) {
    // return val1 === val2
    return Object.is(val1, val2);
  }

  // 均为对象
  const keys1 = Object.keys(val1);
  const keys2 = Object.keys(val2);
  for (const k of keys1) {
    if (!keys2.includes(k)) {
      return false;
    }
  }
  const entries1 = Object.entries(val1);
  const entries2 = Object.entries(val2);
  if (entries1.length !== entries2.length) {
    return false;
  }

  for (const [key, value] of entries1) {
    if (!equal(value, val2[key])) {
      return false;
    }
  }
  return true;
}

console.log(
  uniqueArray([
    { b: 2, a: 1, c: undefined },
    { a: 1, b: 2, d: undefined },
    1,
    4,
    1,
  ]),
);
// 扩展问题，如果对象中有不可遍历的属相如何处理
