class Car {
  constructor(number, name) {
    this.number = number
    this.name = name
  }
}

class Kuaiche extends Car {
  constructor(number, name) {
    super(number, name)
    this.price = 1.5
  }
}

class Zhuanche extends Car {
  constructor(number, name) {
    super(number, name)
    this.price = 2
  }
}

class Trip {
  constructor(car) {
    this.car = car
  }

  start() {
    console.log(`行程开始，名称：${this.car.name}, 车牌号：${this.car.number}`);
  }
  end() {
    console.log(`行程结束，价格：${this.car.price * 5}`);
  }
}

let kuaiCar = new Kuaiche(100, '奥迪A6')

let trip = new Trip(kuaiCar)

trip.start()
trip.end()
