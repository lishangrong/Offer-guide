// 状态模式
// 介绍-演示-示例-场景-总结
// 介绍：一个对象有状态变化，每个状态变化都会触发一个逻辑，不能总是用if-else 来控制
// 示例-交通信号灯不同颜色的变化
// 场景： 1.有限状态机 2.写一个简单的Promise


// 状态（红灯，绿灯，黄灯）
class State {
  constructor(color) {
    this.color = color
  }

  handle(context) {
    console.log(`turn to ${this.color} light`);
    context.setState(this)
  }
}
// 主ti4
class Context {
  constructor() {
    this.state = null
  }

  getState() {
    return this.state
  }

  setState(state) {
    this.state = state
  }
}

let context = new Context()
let green = new State('green')
let yellow = new State('yellow')
let red = new State('red')

// 绿灯亮了
green.handle(context)
console.log(context.getState());
// 黄灯凉了
yellow.handle(context)
console.log(context.getState());
// 绿灯亮了
red.handle(context)
console.log(context.getState());