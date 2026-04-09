//观察者模式： nodejs自定义事件
const EventEmitter = require('events').EventEmitter
// ---------示例1----------
// const emittrt1 = new EventEmitter()
// // 监听 some 事件
// emittrt1.on('some', info=>{
//   console.log('fn1', info);
// })
// // 监听 some 事件
// emittrt1.on('some', info=>{
//   console.log('fn2', info);
// })

// // 触发 some 事件
// emittrt1.emit('some', 'xxxxx')

//  ----------示例2------------
// class Dog extends EventEmitter {
//   constructor(name) {
//     super()
//     this.name = name
//   }
// }
// let simon = new Dog('simon')
// simon.on('bark', function(){
//   console.log(this.name, 'barked-1');
// })
// simon.on('bark', function(){
//   console.log(this.name, 'barked-2');
// })
// setInterval(function(){
//   simon.emit('bark')
// }, 1000)

// ---------示例3-------
// // stream 自定义事件
// const fs = require('fs')
// const readStream = fs.createReadStream('./data/file.txt')
// let length = 0

// readStream.on('data', function(chunk){
//   let len = chunk.toString().length
//   console.log('len:', len);
//   length += len
// })

// readStream.on('end', function() {
//   console.log('length:', length);
// })


//  ---- 示例4 ----
const fs = require('fs')
const readline = require('readline')

let rl = readline.createInterface({
  input: fs.createReadStream('./data/file.txt')
})

let lineNum = 0

rl.on('line', function(line) {
  lineNum++
})

rl.on('close', function() {
  console.log('lineNum', lineNum);
})
