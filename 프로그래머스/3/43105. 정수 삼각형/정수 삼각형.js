function solution(triangle) {
  const n = triangle.length;
  const dp = [triangle[0][0]];

  for (let i = 1; i < n; i += 1) {
    const row = triangle[i];

    dp[i] = dp[i - 1] + row[i];

    for (let j = i - 1; j > 0; j -= 1) {
      dp[j] = Math.max(dp[j - 1], dp[j]) + row[j];
    }

    dp[0] += row[0];
  }

  return Math.max(...dp);
}
