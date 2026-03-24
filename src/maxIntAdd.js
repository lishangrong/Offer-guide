/**
 * 腾讯面试题
 * 两个超过整数存储范围的大整数求和
 * @param {string} a   '36736538'
 * @param {string} b   '00899924'
 */
function sum(a, b) {
  const maxLen = Math.max(a.length, b.length);
  a = a.padStart(maxLen, "0"); // 补齐长度
  b = b.padStart(maxLen, "0"); // 补齐长度
  let result = "";
  let carry = 0; // 当前进位的值
  for (let i = maxLen - 1; i >= 0; i--) {
    const sum = +a[i] + +b[i] + carry;
    const r = sum % 10; // 得到单位数
    carry = Math.floor(sum / 10); // 得到进位数
    result = r + result;
  }

  if (carry) {
    result = carry + result; // 如果有进位
  }

  return result;
}

// console.log(sum('36736538', '899924'));
