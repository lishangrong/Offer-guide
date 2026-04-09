function loadImg (src) {
  let promise = new Promise(function(resolve, reject){
    let img = document.createElement('img')
    img.onload = function() {
      resolve(img)
    }
    img.onerror = function() {
      reject('图片加载失败')
    }
    img.src = src
  }) 

  return promise
}

let src = '//lib.eqh5.com/eqx.layout/images1/new_logo.svg'
let res = loadImg(src)

res.then(function(img) {
  alert(`width: ${img.width}`)
  return img
}).then(function(img) {
  alert(`heiight: ${img.height}`)
}).catch(function(err) {
  alert(err)
})