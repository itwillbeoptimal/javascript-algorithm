function solution(target) {
  const dp = Array.from({ length: target + 1 }, () => [Infinity, 0]);
  const single = Array.from({ length: 20 }, (_, i) => i + 1);
  const double = Array.from({ length: 20 }, (_, i) => (i + 1) * 2);
  const triple = Array.from({ length: 20 }, (_, i) => (i + 1) * 3);
  const singleOrBull = new Set([...single, 50]);
  const doubleOrTriple = new Set([...double, ...triple]);

  dp[0] = [0, 0];

  for (let i = 1; i <= target; i++) {
    for (let j = 1; j <= i && j <= 60; j++) {
      if (!singleOrBull.has(j) && !doubleOrTriple.has(j)) continue;

      const darts = dp[i - j][0] + 1;
      const singles = dp[i - j][1] + (singleOrBull.has(j) ? 1 : 0);

      if (darts < dp[i][0] || (darts === dp[i][0] && singles > dp[i][1])) {
        dp[i] = [darts, singles];
      }
    }
  }

  return dp[target];
}
