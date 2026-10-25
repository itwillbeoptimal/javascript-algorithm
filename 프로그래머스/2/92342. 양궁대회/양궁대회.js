function solution(n, info) {
  let bestArrows = [];
  let maxScoreGap = -Infinity;

  const evaluate = (ryanArrows) => {
    let ryanScore = 0;
    let apeachScore = 0;

    for (let i = 0; i < 11; i++) {
      if (!info[i] && !ryanArrows[i]) continue;
      if (info[i] >= ryanArrows[i]) apeachScore += 10 - i;
      else ryanScore += 10 - i;
    }

    const scoreGap = ryanScore - apeachScore;

    if (scoreGap > maxScoreGap) {
      maxScoreGap = scoreGap;
      bestArrows = ryanArrows;
    } else if (scoreGap === maxScoreGap) {
      for (let i = 10; i >= 0; i--) {
        if (ryanArrows[i] < bestArrows[i]) break;
        if (ryanArrows[i] > bestArrows[i]) {
          bestArrows = ryanArrows;
          break;
        }
      }
    }
  };

  const dfs = (startIndex, remainingArrows, arrows) => {
    if (!remainingArrows) return evaluate(arrows);

    for (let i = startIndex; i < 11; i++) {
      for (let count = 1; count <= remainingArrows; count++) {
        const nextArrows = [...arrows];
        nextArrows[i] = count;
        dfs(i + 1, remainingArrows - count, nextArrows);
      }
    }
  };

  dfs(0, n, Array(11).fill(0));

  return maxScoreGap <= 0 ? [-1] : bestArrows;
}