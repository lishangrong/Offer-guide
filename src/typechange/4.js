/**
 * 比较两个字符串的大小
 * 两个字符串都是用-连接的数字 如1-2--33---41-5
 * 比较方式是从左到右，依次比较每个数字的大小，遇到相等的数字继续往后比
 * 较，遇到不同的数字直接得到比较结果
 *  s1 > s2 return 1
 *  s1 < s2 return -1
 *  s1 === s2 return 0
 */
function compare(s1, s2) {
  const iter1 = walk(s1);
  const iter2 = walk(s2);
  while (true) {
    const { value: v1, done: d1 } = iter1.next();
    const { value: v2, done: d2 } = iter2.next();
    if (d1 && d2) return 0;
    if (d1) return -1;
    if (d2) return 1;
    if (v1 > v2) return 1;
    if (v1 < v2) return -1;
  }
}

function* walk(str) {
  let num = "";
  for (const c of str) {
    if (c !== "-") {
      num += c;
    } else {
      if (num) {
        yield Number(num);
        num = "";
      }
    }
  }

  if (num) {
    yield Number(num);
  }
}
// const iter = walk('1-2-33--4---6')
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
