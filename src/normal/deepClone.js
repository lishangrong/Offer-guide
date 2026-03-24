function deepClone(source, map = new WeakMap()) {
  // 处理循环引用
  if (map.has(source)) {
    return map.get(source);
  }
  if (source === null || typeof source !== "object") {
    return source; // 基本类型直接返回
  }

  // 处理特殊对象
  if (source instanceof Date) {
    return new Date(source);
  }
  if (source instanceof RegExp) {
    return new RegExp(source);
  }
  const target = Array.isArray(source) ? [] : {};
  map.set(source, target);
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = deepClone(source[key], map);
    }
  }
  return target;
}

const user = {
  name: "lisr",
  age: 30,
  addressInfo: {
    province: "山东省",
    city: "临沂市",
    detail: ["莒南县", "洙边镇", "清水涧村"],
  },
  props: {
    birthday: new Date("1988-10-10"),
  },
  certificates: ["PMP项目管理", "英语四级证书", "会计初级资格证"],
};

console.log(deepClone(user));
