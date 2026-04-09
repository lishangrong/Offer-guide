/**
 * 有限状态机
 * 有限个状态、以及在这些状态之间的变化
 * 如交通信号灯
 * 使用开源lib： javascript-state-machine
 * github.com/jakesgordon/javascript-state-machine
 */

// npm install --save-dev javascript-state-machine

// 状态机模型
import StateMachine from 'javascript-state-machine';
// 初始化状态机模型
let fsm = new StateMachine({
  init: '收藏', // 初始化状态-待收藏
  transitions: [
    {
      name: 'doStore',
      from: '收藏',
      to: '取消收藏'
    },
    {
      name: 'deleteStore',
      from: '取消收藏',
      to: '收藏'
    }
  ],
  methods: {
    // 监听执行收藏
    onDoStore: function() {
      alert('收藏成功')
      updateText()
    },
    // 监听取消收藏
    onDeleteStore: function() {
      alert('已取消收藏')
      updateText()
    }
  }
})


// 按钮点击切换状态
let $btn = $('#btn')
$btn.click(function() {
  if(fsm.is('收藏')){
    fsm.doStore()
  } else {
    fsm.deleteStore()
  }
})

// 更新文案
function updateText() {
  console.log('updateText:', $btn.text());
  $btn.text(fsm.state)
}
// 初始化文案
updateText()