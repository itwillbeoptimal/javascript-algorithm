function solution(target) {
  const dp = Array.from({ length: target + 1 }, () => [Infinity, 0]);
  dp[0] = [0, 0];

  const scores = new Map();
  for (let i = 1; i <= 20; i++) {
    scores.set(i * 3, 0);
    scores.set(i * 2, 0);
  }
  for (let i = 1; i <= 20; i++) scores.set(i, 1);
  scores.set(50, 1);

  for (let i = 1; i <= target; i++) {
    for (const [score, isSingle] of scores) {
      if (score > i) continue;
      const darts = dp[i - score][0] + 1;
      const singles = dp[i - score][1] + isSingle;
      if (darts < dp[i][0] || (darts === dp[i][0] && singles > dp[i][1])) {
        dp[i] = [darts, singles];
      }
    }
  }

  return dp[target];
}