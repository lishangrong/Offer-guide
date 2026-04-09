// 适配器模式
class Adaptee {
  specificRequest() {
    return '德国标准插头'
  }
}

class Target {
  constructor() {
    this.adaptee = new Adaptee()
  }

  request() {
    let info = this.adaptee.specificRequest()
    return `_${info} - 转换 - 中国彼岸准插头`
  }
}

// 测试
let target = new Target()
let res = target.request()
console.log(res);

// 适配器模式使用场景：1.封装旧接口，2.vue computed：test.html

