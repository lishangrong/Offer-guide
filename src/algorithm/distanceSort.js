// （算法）数组排序：最近距离排序

let xm = {
  name: "小明",
  home: 700,
};

let schoolfellow = [
  {
    name: "李华",
    home: 300,
  },
  {
    name: "王芳",
    home: 701,
  },
  {
    name: "杨树",
    home: 1500,
  },
  {
    name: "成全",
    home: 1000,
  },
  {
    name: "无脑",
    home: 900,
  },
];
/**
 * 按照与小明的距离排序 比小明近的排前面，比小明远的排后面
 * @param {Object[]} arr 源数据
 * @param {Object} info 排序参考对象
 */
function sort(arr, info) {
  function _dis(o1, o2) {
    return Math.abs(o1.home - o2.home);
  }
  return arr.sort((a, b) => _dis(a, info) - _dis(b, info));
}

console.log(sort(schoolfellow, xm));
