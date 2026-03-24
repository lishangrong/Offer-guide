// （算法+场景）LRU (least Recently Used --- 最久未使用)缓存算法
class LRUCache {
  #cache;
  constructor(capacity) {
    this.capacity = capacity;
    this.#cache = new Map();
  }

  has(key) {
    return this.#cache.has(key);
  }
  get(key) {
    if (!this.#cache.has(key)) {
      return;
    }
    // 获取值并调整顺序
    const value = this.#cache.get(key);
    this.#cache.delete(key);
    this.#cache.set(key, value);
    return value;
  }
  put(key, value) {
    if (this.#cache.has(key)) {
      this.#cache.delete(key);
    } else if (this.#cache.size > this.capacity) {
      this.#cache.delete(this.#cache.keys().next().value);
    }

    this.#cache.set(key, value);
  }
}
