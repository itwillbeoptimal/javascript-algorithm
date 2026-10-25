function solution(numbers) {
  const positions = [
    [3, 1],
    [0, 0], [0, 1], [0, 2],
    [1, 0], [1, 1], [1, 2],
    [2, 0], [2, 1], [2, 2],
  ];

  const cost = Array.from({ length: 10 }, (_, from) =>
    Array.from({ length: 10 }, (_, to) => {
      if (from === to) return 1;

      const [fromY, fromX] = positions[from];
      const [toY, toX] = positions[to];
      const diffY = Math.abs(fromY - toY);
      const diffX = Math.abs(fromX - toX);

      return Math.max(diffY, diffX) * 2 + Math.min(diffY, diffX);
    })
  );

  const createTable = () => Array.from({ length: 10 }, () => Array(10).fill(Infinity));

  let dp = createTable();
  dp[4][6] = 0;

  for (const char of numbers) {
    const target = Number(char);
    const next = createTable();

    for (let left = 0; left < 10; left++) {
      for (let right = 0; right < 10; right++) {
        const total = dp[left][right];
        if (left === right || total === Infinity) continue;

        if (target !== right) {
          next[target][right] = Math.min(next[target][right], total + cost[left][target]);
        }
        if (target !== left) {
          next[left][target] = Math.min(next[left][target], total + cost[right][target]);
        }
      }
    }

    dp = next;
  }

  return Math.min(...dp.flat());
}