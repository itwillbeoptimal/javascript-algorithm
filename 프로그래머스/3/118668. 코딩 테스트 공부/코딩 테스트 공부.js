function solution(alp, cop, problems) {
  let alpMax = alp;
  let copMax = cop;

  problems.forEach(([alpReq, copReq]) => {
    alpMax = Math.max(alpMax, alpReq);
    copMax = Math.max(copMax, copReq);
  });

  const dp = Array.from({ length: alpMax + 1 }, () => Array(copMax + 1).fill(Infinity));
  dp[alp][cop] = 0;

  const update = (nextAlp, nextCop, time) => {
    dp[nextAlp][nextCop] = Math.min(dp[nextAlp][nextCop], time);
  };

  for (let i = alp; i <= alpMax; i++) {
    for (let j = cop; j <= copMax; j++) {
      if (i < alpMax) update(i + 1, j, dp[i][j] + 1);
      if (j < copMax) update(i, j + 1, dp[i][j] + 1);

      problems.forEach(([alpReq, copReq, alpRwd, copRwd, cost]) => {
        if (i < alpReq || j < copReq) return;

        const nextAlp = Math.min(alpMax, i + alpRwd);
        const nextCop = Math.min(copMax, j + copRwd);
        update(nextAlp, nextCop, dp[i][j] + cost);
      });
    }
  }

  return dp[alpMax][copMax];
}