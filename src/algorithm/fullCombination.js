// 大厂面试算法题：全组合判断 - 商品

/**
 * 字段1 甲, 乙   =>2
 * 字段2 a, b    => 2
 * 字段3 1, 2, 3  => 3
 * 总组合数 => 2 * 2 * 3 = 12
 */

function isFullCombination(datas) {
  if (datas.length === 0) {
    return false;
  }
  const keys = Object.keys(datas[0]);
  // 值的序列化，去重
  const valueSerialize = new Set();
  const fieldMap = new Map(keys.map((key) => [key, new Set()]));
  // 字段值的映射,防止字段值中出现‘-’符号，导致序列化后字段值重复
  const valueMap = new Map();
  let n = 1;
  for (const data of datas) {
    let serialized = "";
    for (const key of keys) {
      const value = data[key];
      if (!valueMap.has(value)) {
        valueMap.set(value, n++);
      }
      serialized += valueMap.get(value) + "-";
      fieldMap.get(key).add(value);
    }

    if (valueSerialize.has(serialized)) {
      return false;
    }
    valueSerialize.add(serialized);
  }
  const n1 = [...fieldMap.values()].reduce((a, b) => a * b.size, 1);
  return n1 === datas.length;
}

const inputData = [
  { 字段1: "甲", 字段2: "a", 字段3: "1" },
  { 字段1: "甲", 字段2: "a", 字段3: "2" },
  { 字段1: "甲", 字段2: "a", 字段3: "3" },
  { 字段1: "甲", 字段2: "b", 字段3: "1" },
  { 字段1: "甲", 字段2: "b", 字段3: "2" },
  { 字段1: "甲", 字段2: "b", 字段3: "3" },
  { 字段1: "乙", 字段2: "a", 字段3: "1" },
  { 字段1: "乙", 字段2: "a", 字段3: "2" },
  { 字段1: "乙", 字段2: "a", 字段3: "3" },
  { 字段1: "乙", 字段2: "b", 字段3: "1" },
  { 字段1: "乙", 字段2: "b", 字段3: "2" },
  { 字段1: "乙", 字段2: "b", 字段3: "3" },
];

console.log(isFullCombination(inputData));
