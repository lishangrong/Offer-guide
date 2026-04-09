// 单件商品数据
class UIGoods { 
  constructor(g) { 
    this.data = g
    this.choose = 0
  }
  getTotalPrice() { 
    return this.data.price * this.choose
  }
  isChoose() { 
    return this.choose > 0
  }
  increase() { 
    this.choose++
  }
  decrease() { 
    if (this.choose === 0) { 
      return
    }
    this.choose--
  }
}
// 整个界面数据
class UIData { 
  constructor() { 
    this.uiGoods = goods.map(good => { 
      return new UIGoods(good)
    })

    // 配送标准
    this.deliveryTheshold = 30
    // 配送费
    this.deliveryPrice = 5
  }
  // 总价
  getTotalPrice() { 
    return this.uiGoods.reduce(
      (pre, cur) => pre + cur.getTotalPrice(),
      0
    )
  }

  // 增加某个商品的数量
  increase(i) { 
    this.uiGoods[i].increase()
  }
  // 减少某个商品的数量
  decrease(i) { 
    this.uiGoods[i].decrease()
  }
  // 总选择数
  getTotalChooseNumber() { 
    return this.uiGoods.reduce((pre, cur) => pre + cur.choose, 0)
  }
  // 购物车中是否有商品
  hasGoodsInCar() {
    return this.getTotalChooseNumber() > 0
  }
  // 是否满足配送标准
  isCroseDeliveryThreshold() { 
    return this.getTotalPrice() >= this.deliveryTheshold
  }
  // 指定商品是否选中
  isChoose(index) { 
    return this.uiGoods[index].isChoose()
  }
}

// 整个界面
class UI { 
  constructor() {
    this.uiData = new UIData();
    this.doms = {
      goodsContainer: document.querySelector('.goods-list'),
      deliveryPrice: document.querySelector('.footer-car-tip'),
      footerPay: document.querySelector('.footer-pay'),
      footerPayInnerSpan: document.querySelector('.footer-pay span'),
      totalPrice: document.querySelector('.footer-car-total'),
      footerCar: document.querySelector('.footer-car'),
      footerCarBadge: document.querySelector('.footer-car-badge')
    }

    //  抛物线终点
    var carRect = this.doms.footerCar.getBoundingClientRect();
    var jumpTarget = {
      x: carRect.left + carRect.width / 2,
      y: carRect.top + carRect.height / 5,
    }
    this.jumpTarget = jumpTarget
    this.createHTML()
    this.updateFooter()
    this.listenEvent()
  }
  // 监听各种事件
  listenEvent() { 
    this.doms.footerCar.addEventListener('animationend', function () {
      this.classList.remove('animate')
    })
  }
  // 根据商品数据创建商品列表元素
  createHTML() {
    // 生成html 字符串 (执行效率低,开发效率高)
    // 一个一个创建元素(执行效率高,开发效率低)
    var html = ''
    this.uiData.uiGoods.forEach((g, i) => {
      html += `<div class="goods-item">
          <img src="${g.data.pic}" alt="" class="goods-pic" />
          <div class="goods-info">
            <h2 class="goods-title">${g.data.title}</h2>
            <p class="goods-desc">${g.data.desc}</p>
            <p class="goods-sell">
              <span>月售 ${g.data.sellNumber}</span>
              <span>好评率${g.data.favorRate}%</span>
            </p>
            <div class="goods-confirm">
              <p class="goods-price">
                <span class="goods-price-unit">￥</span>
                <span>${g.data.price}</span>
              </p>
              <div class="goods-btns">
                <i index="${i}" class="iconfont i-jianhao"></i>
                <span>${g.choose}</span>
                <i index="${i}" class="iconfont i-jiajianzujianjiahao"></i>
              </div>
            </div>
          </div>
        </div>`;
      this.doms.goodsContainer.innerHTML = html
    });
  }
  increase(index) { 
    this.uiData.increase(index)
    this.updateGoodsItem(index)
    this.updateFooter()
    this.jump(index)
  }
  decrease(index) { 
    this.uiData.decrease(index)
    this.updateGoodsItem(index)
    this.updateFooter()
  }

  updateGoodsItem(index) { 
    var goodsDom = this.doms.goodsContainer.children[index]
    if (this.uiData.isChoose(index)) {
      goodsDom.classList.add('active')
    } else { 
      goodsDom.classList.remove('active')
    }

    var span = goodsDom.querySelector('.goods-btns span')
    span.textContent = this.uiData.uiGoods[index].choose
  }
  
  // 更新页脚
  updateFooter() { 
    // 得到总价
    var total = this.uiData.getTotalPrice()
    // 设置配送诶
    this.doms.deliveryPrice.textContent = `配送¥${this.uiData.deliveryPrice}`
    if (this.uiData.isCroseDeliveryThreshold()) {
      this.doms.footerPay.classList.add('active')
    } else { 
      this.doms.footerPay.classList.remove('active')
      // 还差多少钱
      var dis = Math.round(this.uiData.deliveryTheshold - total)
      this.doms.footerPayInnerSpan.textContent = `还差¥${dis}元起送`
    }
    // 设置总价
    this.doms.totalPrice.textContent = total.toFixed(2);
    // 设置购物车的样式状态
    if (this.uiData.hasGoodsInCar()) {
      this.doms.footerCar.classList.add('active')
    } else { 
      this.doms.footerCar.classList.remove('active')
    }

    // 设置购物车中的数量
    this.doms.footerCarBadge.textContent = this.uiData.getTotalChooseNumber()
  }
  // 购物车动画
  carAnimate() {
    this.doms.footerCar.classList.add('animate')
  }
  // 抛物线跳跃的元素
  jump(index) {
    var goodItem = this.doms.goodsContainer.children[index];
    var btnAdd = goodItem.querySelector('.i-jiajianzujianjiahao')
    var rect = btnAdd.getBoundingClientRect()
    var start = {
      x: rect.left,
      y: rect.top
    }
    // 跳
    var div = document.createElement('div');
    div.className = 'add-to-car';
    var i = document.createElement('i')
    i.className = 'iconfont i-jiajianzujianjiahao'
    // 设置初始位置
    div.style.transform = `translateX(${start.x}px)`
    i.style.transform = `translateY(${start.y}px)`
    div.appendChild(i)
    document.body.appendChild(div)
    // 强行渲染
    div.clientWidth;
    // requestAnimationFrame() 

    // 设置结束位置
    div.style.transform = `translateX(${this.jumpTarget.x}px)`;
    i.style.transform = `translateY(${this.jumpTarget.y}px)`;

    var that = this
    // 过度结束
    div.addEventListener('transitionend', function () { 
      div.remove();
      that.carAnimate();
    }, {
      once: true
    })

  }
}


var ui = new UI()
// 事件
ui.doms.goodsContainer.addEventListener('click', function (e) { 
  // 加号
  if (e.target.classList.contains('i-jiajianzujianjiahao')) { 
    const i = +e.target.getAttribute('index')
    ui.increase(i)
  } else if (e.target.classList.contains('i-jianhao')) {
    const i = +e.target.getAttribute('index')
    ui.decrease(i)
  }
})