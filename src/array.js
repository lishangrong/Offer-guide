// 数组去重
const arr = [2, 3, 4, null, 2, 8, NaN, 1, NaN, 4, null];

// 1. new Set 时间复杂度 O(n) 自动处理`NaN`
const uniqueArr = Array.from(new Set(arr));
console.log("new Set:", uniqueArr);

// 2. filter + indexOf 时间复杂度为O(n²) *   无法正确处理`NaN`（`indexOf`无法检测`NaN`）
const uniqueArr1 = arr.filter((item, index) => arr.indexOf(item) === index);
console.log("filter+indexOf", uniqueArr1);

// 3. reduce 时间复杂度为O(n²)
const uniqueArr2 = arr.reduce((acc, current) => {
  return acc.includes(current) ? acc : [...acc, current];
}, []);
console.log("reduce:", uniqueArr2);

// 4. Map 时间复杂度为O(n) *  正确处理`NaN`
function unique(arr) {
  const seen = new Map();
  arr.filter((item) => {
    if (!seen.has(item)) {
      seen.set(item, true);
    }
  });
  return Array.from(seen.keys());
}
console.log("map:", unique(arr));
