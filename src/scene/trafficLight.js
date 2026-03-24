// 面试场景题：交通灯问题
// 1. 计时器模式 -- 不精准
// 2. 问询模式
class TrafficLight {
  constructor(lights) {
    this._lights = lights;
    this._currentIndex = 0;
    this.time = Date.now();
  }
  _update() {
    while (1) {
      if (this._disTime() <= this.currentLight.lasts) {
        break;
      }
      this.time += this.currentLight.lasts;
      this._currentIndex = (this._currentIndex + 1) % this._lights.length;
    }
  }
  get currentLight() {
    return this._lights[this._currentIndex];
  }
  _disTime() {
    return Date.now() - this.time;
  }
  getCurrentLight() {
    // 更新灯的状态
    this._update();
    return {
      color: this.currentLight.color, // 颜色
      remain: this.currentLight.lasts - this._disTime(), // 剩余时间
    };
  }
}
