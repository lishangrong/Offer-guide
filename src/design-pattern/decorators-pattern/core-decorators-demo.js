// core-decorators 
// 第三方开源lib 通用常用的装饰器  
// 查阅文档： https://github.com/jayphelps/core-decorators
// npm install core-decorators --save

import { readonly, deprecate } from "core-decorators"
class Person {
  constructor() {
    this.first = 'A'
    this.last = 'B'
  }
  // @readonly
  @deprecate('即将废用', { url: 'www.imooc.com' })
  name() {
    return `${this.first} ${this.last}`
  }
}

const p = new Person()
console.log(p.name());
// p.name = function() {
//   alert(100)
// } // 应该报错