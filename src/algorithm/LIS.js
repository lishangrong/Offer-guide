// （算法）动态规划：所有人都在卷的面试题——最长递增子序列
/**
 * 求最长递增子序列
 * @param {number[]} nums
 */
function LIS(nums) {
  if (nums.length === 0) {
    return [];
  }
  const result = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    const n = nums[i];
    _update(n);
  }
  function _update(n) {
    for (let i = result.length - 1; i >= 0; i--) {
      const line = result[i];
      const tail = line[line.length - 1];
      if (n > tail) {
        result[i + 1] = [...line, n];
        return;
      }
    }
    result[0] = [n];
  }
  return result[result.length - 1];
}

// expect [1, 2, 3, 6, 9]
console.log(LIS([4, 5, 1, 2, 7, 3, 6, 9]));
