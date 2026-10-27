function solution(n) {
  const dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= n; i++) {
    dp[i][0] = 1;
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[n][n];
}