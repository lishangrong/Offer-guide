// 经典算法题：验证回文串（字节）

/**
 * 验证回文串
 * 回文串：一个字符串，忽略大小写和非字母数字，正着读和反着读都是一样的
 * 例如： "A man, a plan, a canal: Panama" 是回文串
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  s = s.replace(/[^0-9a-zA-Z]/g, "").toLowerCase();
  let i = 0;
  let j = s.length - 1;
  while (i < j) {
    if (s[i] !== s[j]) {
      return false;
    }
    i++;
    j--;
  }
  return true;
};

console.log(isPalindrome("A man, a plan, a canal: Panama"));
console.log(isPalindrome("98"));
console.log(isPalindrome("ab.cba,"));
