// 单例模式
class SingleObject {
  login() {
    console.log('login....');
  }
}

SingleObject.getInstance = (function() {
  let instance = null
  return function() {
    if (!instance) {
      instance = new SingleObject()
    }
    return instance
  }
})()

let obj1 = SingleObject.getInstance()
obj1.login()

let obj2 = SingleObject.getInstance()
obj2.login()
console.log('obj1 === obj2', obj1 === obj2);

console.log('--------分割线------');

let obj3 = new SingleObject() // 无法完全控制 
console.log('obj1 === obj3', obj1 === obj3);


// 示例-登录框（或购物车）
class LoginForm {
  constructor() {
    this.state = 'hide'
  }
  show(){
    if (this.state === 'show') {
      alert('已显示')
      return 
    }

    this.state = 'show'
    console.log('登录框显示成功');
  }

  hide(){
    if (this.state === 'hide') {
      alert('已隐藏')
      return
    }

    this.state = 'hide'
    console.log('登录框隐藏成功');
  }
}

LoginForm.getInstance = (function(){
  let instance = null
  return function() {
    if (!instance) {
      instance = new LoginForm()
    }
    return instance
  }
})()

// 测试
let login1 = LoginForm.getInstance()
login1.show()
let login2 = LoginForm.getInstance()
login2.hide()
console.log('login1 === login2', login1 === login2);