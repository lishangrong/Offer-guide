// （场景）任务执行的洋葱模型（腾讯） nodeJS-koa

class TaskPro {
  _taskLikst = [];
  addTask(task) {
    this._taskLikst.push(task);
  }
  run() {
    if (this._taskLikst.length === 0) return;
    const task = this._taskLikst.shift();
    // 考虑异步
    return task(() => {
      return this.run();
    });
  }
}

// 实现类 TaskPro 满足下列输出结果
const t = new TaskPro();
t.addTask(async (next) => {
  console.log(1, "start");
  await next();
  console.log(1, "end");
});

t.addTask((next) => {
  console.log(2);
  next();
});

t.addTask((next) => {
  console.log(3);
  next();
});

t.run(); // 输出结果： 1 start 2 3 1 end
