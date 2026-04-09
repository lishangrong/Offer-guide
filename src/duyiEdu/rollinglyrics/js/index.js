// 数据逻辑 -> 界面逻辑 -> 事件

/**
 * 解析歌词字符串
 * 得到一个歌词对象的数组
 * 每个歌词对象: {time:开始时间, words: 歌词内容}
 */
function parseLrc() {
  let lines = lrc.split('\n')
  let lrcArr = []
  for (let i = 0; i < lines.length; i++) {
    let parts = lines[i].split(']')
    lrcArr.push({
      time: parseTime(parts[0].substring(1)),
      words: parts[1]
    })
  }

  return lrcArr
}

/**
 * 将时间字符串解析为数字(秒)
 * @param {String} timeSrtr 时间字符串
 * @returns 
 */
function parseTime(timeSrtr) { 
  let parts = timeSrtr.split(":")
  const time = +parts[0] * 60 + parts[1] * 1
  return time

}

let lrcData = parseLrc()
console.log(lrcData);
var doms = {
  audio: document.querySelector('audio'),
  container: document.querySelector('.container'),
  ul: document.querySelector('.container ul'),
}

/**
 * 计算出 在当前播放器播放到第几秒的情况
 * lrcData 数组中,应该高亮显示的歌词下标
 */
function findIndex() { 
  var curTime = doms.audio.currentTime;
  for (let i = 0; i < lrcData.length; i++) {
    const element = lrcData[i];
    if (curTime < element.time) { 
      return i - 1
    }
  }
  // 循环结束没找到(播放到最后一句)
  return lrcData.length - 1
}
/**
 * 创建歌词元素 li
 */
function createLrcElements() { 
  // 文档片段
  var frag = document.createDocumentFragment()
  for (let i = 0; i < lrcData.length; i++) {
    var li = document.createElement('li')
    li.textContent = lrcData[i].words
    // doms.ul.appendChild(li) // 改动 dom 树
    frag.appendChild(li)
  }
  doms.ul.appendChild(frag)
}

// 界面
createLrcElements()

// 容器高度
var containerH = doms.container.clientHeight;
// 歌词 li 高度
var liH = doms.ul.children[0].clientHeight;
var ulH = doms.ul.clientHeight;
// 最大偏移量
var maxOffset = ulH - containerH

/**
 * 设置 ul 元素偏移量
 */
function setOffset() {
  let index = findIndex()
  let offset = index  * liH + liH / 2 - containerH / 2
  if (offset < 0) { 
    offset = 0
  }
  if (offset > maxOffset) { 
    offset = maxOffset
  }
  doms.ul.style.transform = `translateY(-${offset}px)`
  // 去掉之前的 active 样式
  let li = doms.ul.querySelector('.active')
  if (li) { 
    li.classList.remove('active')
  }
  li = doms.ul.children[index]
  if (li) { 
    li.classList.add('active')
  }
}

doms.audio.addEventListener('timeupdate', setOffset)