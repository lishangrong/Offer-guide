// 网络请求，失败可以重试
function request(url, maxCount) {
  return fetch(url).catch(
    (err = maxCount <= 0 ? Promise.reject(err) : request(url, maxCount - 1)),
  );
}
