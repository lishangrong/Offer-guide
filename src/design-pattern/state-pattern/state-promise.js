// 写一个简单的Promise, 三种状态：pending fullfilled rejected
// pending -> fullfilled 或者 pending -> rejected

import StateMachine from 'javascript-state-machine';
let fsm = new StateMachine({
  init: 'pending',
  transitions: [
    {
      name: 'resolve',
      from: 'pending',
      to: 'fullfilled'
    },
    {
      name: 'reject',
      from: 'pending',
      to: 'rejected'
    }
  ],
  methods: {
    // 成功
    onResolve: function(state, data) {
      // state-当前状态机实例； data-fsm.resolve(xxx)传递的参数
      data.successList.forEach(fn => fn());
    },
    // 监听取消收藏
    onReject: function(state, data) {
      // state-当前状态机实例； data-fsm.reject(xxx)传递的参数
      data.failList.forEach(fn => fn())
    }
  }
})

class MyPromise {
  constructor(fn) {
    this.successList = []
    this.failList = []
    fn(()=> {
      // resolve 函数
      fsm.resolve(this)
    }, ()=> {
      // reject 函数
      fsm.reject(this)
    })
  }
  then(successFn, failFn){
    this.successList.push(successFn)
    this.failList.push(failFn)
  }
}

// --------测试代码-----------
function loadImg(src) {
  const promise = new MyPromise(function(resolve, reject){
    let img = document.createElement('img')
    img.onload = function() {
      resolve(img)
    }
    img.onerror = function() {
      reject()
    }
    img.src = src
  })

  return promise
}

let src = '//lib.eqh5.com/eqx.layout/images1/new_logo.svg'
let result = loadImg(src)
result.then(function() {
  console.log('ok1');
}, function() {
  console.log('fail1');
})


result.then(function() {
  console.log('ok2');
}, function() {
  console.log('fail3');
})