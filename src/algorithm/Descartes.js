// 算法题：按键映射（微软）
/**
 * 根据数字按键，得到所有字母排列组合(手机九键) -- 获取2个字符串的笛卡尔集
 * @param {string} digits 数字按键 例如 '23'
 * @returns {string[]} 按键的所有字母排列组合
 */
function keyboardMap(digits) {
  function _compose(str1, str2) {
    if (str1.length === 0) return str2.split("");
    if (str2.length === 0) return str1.split("");
    let result = [];
    for (let i = 0; i < str1.length; i++) {
      for (let j = 0; j < str2.length; j++) {
        result.push(str1[i] + str2[j]);
      }
    }
    return result;
  }
  const map = [, , "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
  const result = digits
    .split("")
    .map((d) => map[Number(d)])
    .reduce(_compose, []);
  return result;
}
console.log(keyboardMap("234"));
