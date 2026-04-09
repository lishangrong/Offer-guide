// 明星
let star = {
  name: '张媛',
  age: 25,
  phone: 'star:13689002100'
}

// 经纪人
let agent = new Proxy(star, {
  get: function(target, key) {
    if (key === 'phone') {
      // 返回经纪人自己的手机号
      return 'agent:18645893636'
    }
    if (key === 'price') {
      // 明星不报价，经纪人报价12w
      return 120000
    }

    return target[key]
  },
  set: function(target, key, val){
    if (key === 'customPrice'){
      if (val < 100000) {
        // 最低10w
        throw new Error('价格太低')
      } else {
        target[key] = val
        return true
      }
    }
  }
})

// test

console.log(agent.name);
console.log(agent.age);
console.log(agent.phone);
console.log(agent.price);

agent.customPrice = 90000
console.log(agent.customPrice);