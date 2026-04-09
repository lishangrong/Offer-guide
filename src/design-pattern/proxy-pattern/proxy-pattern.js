// 代理模式
// 设计原则：代理类和目标类分离，隔离开目标类和使用者

// 代理模式 VS 适配器
// 适配器模式：提供一个不同的接口（如不同版本的插头）
// 代理模式：提供一模一样的接口
// 代理模式 VS 装饰器模式
// 装饰器：扩展功能，原有功能不变且可直接使用
// 代理模式：显示原有功能，但是经过限制或者阉割之后的

class ReadImg {
  constructor(filename) {
    this.filename = filename;
    this.loadFromDisk() // 初始化即从硬盘中加载，模拟
  }

  display() {
    console.log('display....' + this.filename);
  }
  loadFromDisk() {
    console.log('loading....' + this.filename);
  }
}

class ProxyImg {
  constructor(filename) {
    this.realImg = new ReadImg(filename)
  }

  display() {
    this.realImg.display()
  }
}

let img = new ProxyImg('1.jpg')
img.display()

