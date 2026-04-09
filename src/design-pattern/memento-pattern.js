// 备忘录模式
// 随时记录一个对象的状态变化，随时可以恢复之前的某个状态（如撤销功能）
// 备忘对象
class Momento {
  constructor(content){
    this.content = content
  }
  getContent() {
    return this.content
  }
}
// 备忘列表
class CareTaker {
  constructor() {
    this.list = []
  }
  add(memento) {
    this.list.push(memento)
  }
  get(index){
    return this.list[index]
  }
}

// 编辑器
class Editor {
  constructor() {
    this.content = null
  }
  setContent(content) {
    this.content = content
  }
  getContent() {
    return this.content
  }
  saveContentToMemento() {
    return new Momento(this.content)
  }

  getContentFromMemento(memento) {
    this.content = memento.getContent()
  }
}

// 测试代码

let editor = new Editor()
let careTaker = new CareTaker()
editor.setContent('111')
editor.setContent('2222')
careTaker.add(editor.saveContentToMemento())
editor.setContent('3333')
careTaker.add(editor.saveContentToMemento())
editor.setContent('4444')

console.log(editor.getContent());
editor.getContentFromMemento(careTaker.get(1))
console.log(editor.getContent());
editor.getContentFromMemento(careTaker.get(0))
console.log(editor.getContent());