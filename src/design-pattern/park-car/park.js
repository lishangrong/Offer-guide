class Car {
  constructor(num) {
    this.num = num
  }
}

class Place {
  constructor(){
    this.empty = true
  }
  in() {
    this.empty = false
  }
  out() {
    this.empty = true
  }
}

class Floors {
  constructor(index, places){
    this.index = index
    this.places = places || []
  }
  emptyPlaceNum(){
    const emptyPlaces = this.places.filter(place=> place.empty)
    return emptyPlaces.length
  }
}

class Camera {
  shot(car) {
    return {
      num: car.num,
      inTime: Date.now()
    }
  }
}

class Screen {
  show(car, inTime) {
    console.log(`车牌号：${car.num}, 停车时长：${Date.now() - inTime}`);
  }
}

class Park {
  constructor(floors) {
    this.floors = floors || [];
    this.camera = new Camera()
    this.screen = new Screen()
    this.carList = {}
  }
  in(car) {
    const info = this.camera.shot(car)
    // 获取车位号
    const i = parseInt(Math.random() * 100 % 100)
    const place = this.floors[0].places[i]
    place.in()
    info.place = place
    this.carList[car.num] = info
    console.log('cardList:',this.carList);
  }
  out(car) {
    // 获取信息
    const info = this.carList[car.num]
    // 停车位驶出
    const place = info.place
    place.out()
    // 显示屏显示
    this.screen.show(car, info.inTime)
    delete this.carList[car.num]
  }
  emptyNum() {
    return this.floors.map(floor => {
      return `第${floor.index}层 还有 ${floor.emptyPlaceNum()}个停车位`
    }).join(',')
  }
}

// 初始化停车场
const floors = []
for (let i = 0; i < 3; i++) {
  const places = [];
  for (let j = 0; j < 100; j++) {
    places[j] = new Place();
  }
  floors[i] = new Floors(i + 1, places)
  
}
const park = new Park(floors)
console.log('park:', park.carList, park.emptyNum());

console.log('第一辆车驶入');
const car1 = new Car(100)
park.in(car1)
console.log('当前空余车位：', park.emptyNum());

const car2 = new Car(200)
setTimeout(() =>{
  console.log('第二辆车驶入');
  park.in(car2)
  console.log('当前空余车位：', park.emptyNum());
}, 1000)

const car3 = new Car(300)
setTimeout(()=> {
  console.log('第三辆车驶入');
  park.in(car3)
  console.log('当前空余车位：', park.emptyNum());
}, 1500)


setTimeout(()=>{
  console.log('第三辆车驶出');
  park.out(car3)
  console.log('当前空余车位：', park.emptyNum());
}, 3000)





