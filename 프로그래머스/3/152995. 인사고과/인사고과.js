function solution(scores) {
  const [a, b] = scores[0];
  const target = a + b;
  const sorted = scores.toSorted((x, y) => y[0] - x[0] || x[1] - y[1]);

  let max = 0;
  let rank = 1;
  for (const [x, y] of sorted) {
    if (y < max) {
      if (x === a && y === b) return -1;
      continue;
    }
    max = y;
    if (x + y > target) rank++;
  }

  return rank;
}