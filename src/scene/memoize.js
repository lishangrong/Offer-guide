class MemoizeMap {
  constructor() {
    // 原始值key
    this._map = new Map();
    // 对象key
    this._weakMap = new WeakMap();
  }
  _isObject(key) {
    return typeof key === "object" && key !== null;
  }
  get(key) {
    if (this._isObject(key)) {
      return this._weakMap.get(key);
    }
    return this._map.get(key);
  }
  set(key, value) {
    if (this._isObject(key)) {
      this._weakMap.set(key, value);
    } else {
      this._map.set(key, value);
    }
  }
  has(key) {
    if (this._isObject(key)) {
      return this._weakMap.has(key);
    }
    return this._map.has(key);
  }
}

// 实现该函数
function memoize(func, resolver) {
  if (typeof resolver !== "function") {
    resolver = (key) => key;
  }
  function memoized(...args) {
    const key = resolver(...args);
    if (memoized.cache.has(key)) {
      return memoized.cache.get(key);
    }
    const result = func.apply(this, args);
    memoized.cache.set(key, result);
    return result;
  }
  memoized.cache = new MemoizeMap();
  return memoized;
}

// 实现 memoize 函数 输出以下结果
var object = { a: 1, b: 2 };
var other = { c: 3, d: 4 };
var values = memoize((obj) => Object.values(obj));
console.log(values(object));
// 输出 [1, 2]

console.log(values(other));
// 输出 [3, 4]

object.a = 2;
console.log(values(object));
// 输出 [1, 2] 缓存命中

values.cache.set(object, ["a", "b"]);
console.log(values(object));
// 输出 ['a', 'b']
