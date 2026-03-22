function solution(arr) {
  const nums = arr.filter((_, i) => i % 2 === 0).map(Number);
  const signs = arr.filter((_, i) => i % 2 === 1);
  const n = nums.length;

  const maxDP = Array.from({ length: n }, () => new Array(n).fill(-Infinity));
  const minDP = Array.from({ length: n }, () => new Array(n).fill(Infinity));

  for (let i = 0; i < n; i++) {
    maxDP[i][i] = minDP[i][i] = nums[i];
  }

  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      for (let k = i; k < j; k++) {
        if (signs[k] === "+") {
          maxDP[i][j] = Math.max(maxDP[i][j], maxDP[i][k] + maxDP[k + 1][j]);
          minDP[i][j] = Math.min(minDP[i][j], minDP[i][k] + minDP[k + 1][j]);
        } else {
          maxDP[i][j] = Math.max(maxDP[i][j], maxDP[i][k] - minDP[k + 1][j]);
          minDP[i][j] = Math.min(minDP[i][j], minDP[i][k] - maxDP[k + 1][j]);
        }
      }
    }
  }

  return maxDP[0][n - 1];
}
