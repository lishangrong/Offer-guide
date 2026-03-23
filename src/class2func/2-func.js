/**
 * ### 1. class 处于严格模式下
 * ### 2. 不能直接 调用 Example()
 * ### 3. 类中的方法 是不可遍历的
 * ### 4. 不能通过 new 调用类中的方法 如 new Exaple.prototype.func()
 *
 */

"use strict";
function Example(name) {
  if (new.target === undefined) {
    throw new TypeError(
      `Class constructor Example cannot be invoked without 'new'`,
    );
  }
  this.name = name;
}

Object.defineProperty(Example.prototype, "func", {
  value: function () {
    if (new.target) {
      throw new TypeError(`Example.prototype.func is not a constructor`);
    }
    console.log(this.name);
  },
  enumerable: false,
});
