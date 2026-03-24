// （场景题）并发任务控制（字节）
function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
// 实现构造器 SuperTask
class SuperTask {
  constructor(paralleCount = 2) {
    this.paralleCount = paralleCount;
    this.task = []; // 正在排队的任务
    this.runCount = 0; // 正在执行的任务数
  }
  add(task) {
    return new Promise((resolve, reject) => {
      this.task.push({
        task,
        resolve,
        reject,
      });
      this._run(); // 尝试叫号
    });
  }
  // 执行任务(叫号)
  _run() {
    while (this.runCount < this.paralleCount && this.task.length) {
      const { task, resolve, reject } = this.task.shift(); // 取出第一个任务
      task()
        .then(resolve, reject)
        .finally(() => {
          // 任务执行完成后，接着叫号
          this.runCount--; // 执行任务数-1
          this._run();
        });
      this.runCount++;
    }
  }
}

// 编写类 SuperTask 实现以下功能 ---分析输出结果，并发数2
const superTask = new SuperTask();
function addTask(time, name) {
  superTask
    .add(() => timeout(time))
    .then(() => {
      console.log(`任务${name}完成`);
    });
}
addTask(10000, 1); // 10000ms后输出 任务1完成
addTask(5000, 2); // 5000ms后输出 任务2完成
addTask(3000, 3); // 8000ms后输出 任务3完成
addTask(4000, 4); // 12000ms后输出 任务4完成
addTask(5000, 5); // 15000ms后输出 任务5完成
