// 命令模式
// JS中的应用: 网页富文本编辑器操作，浏览器封装了一个命令对象
// document.execCommand('bold') document.execCommand('undo')
// 接收者
class Receiver {
  exec() {
    console.log('执行');
  }
}
// 命令者
class Command {
  constructor(receiver) {
    this.receiver = receiver
  }
  cmd() {
    console.log('执行命令');
    this.receiver.exec()
  }
}

// 触发者
class Invoker {
  constructor(command) {
    this.command = command
  }
  invoke() {
    console.log('开始');
    this.command.cmd()
  }
}
// 士兵
let soldier = new Receiver()
// 小号手
let trumpeter = new Command(soldier)
// 将军
let general = new Invoker(trumpeter)
general.invoke()