// 原型模式 - Object.create

let prototype = {
  getName: function() {
    return this.first + ' ' + this.last
  },
  say: function() {
    alert('hello')
  }
}
// 基于原型创建 x

let x = Object.create(prototype)
x.first = 'A'
x.last = 'B'
alert(x.getName())
x.say()

// 基于原型创建 y

let y = Object.create(prototype)
y.first = '_A'
y.last = '_B'
alert(y.getName())
y.say()