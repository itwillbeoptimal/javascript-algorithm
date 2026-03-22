function solution(m, n, puddles) {
  const MOD = 1_000_000_007;
  let grid = Array.from({ length: n }, () => Array(m).fill(1));

  puddles.forEach(p => {
    const [px, py] = p;
    grid[py - 1][px - 1] = 0;
  });

  for (let i = 1; i < n; i++) {
    grid[i][0] = grid[i][0] ? grid[i - 1][0] % MOD : 0;
  }
  for (let j = 1; j < m; j++) {
    grid[0][j] = grid[0][j] ? grid[0][j - 1] % MOD : 0;
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      if (!grid[i][j]) continue;
      grid[i][j] = (grid[i][j - 1] + grid[i - 1][j]) % MOD;
    }
  }

  return grid[n - 1][m - 1];
}