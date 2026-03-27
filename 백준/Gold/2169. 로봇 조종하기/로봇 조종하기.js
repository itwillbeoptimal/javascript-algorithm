const fs = require("fs");
input = fs.readFileSync(0, "utf-8").trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const grid = input.slice(1).map(line => line.split(" ").map(Number));

let dp = Array.from({ length: n }, () => Array(m).fill(-Infinity));
dp[0][0] = grid[0][0];
for (let i = 1; i < m; i++) dp[0][i] = dp[0][i - 1] + grid[0][i];

for (let i = 1; i < n; i++) {
  let left = Array(m);
  let right = Array(m);

  left[0] = dp[i - 1][0] + grid[i][0];
  for (let j = 1; j < m; j++) {
    left[j] = Math.max(left[j - 1] + grid[i][j], dp[i - 1][j] + grid[i][j]);
  }

  right[m - 1] = dp[i - 1][m - 1] + grid[i][m - 1];
  for (let j = m - 2; j >= 0; j--) {
    right[j] = Math.max(right[j + 1] + grid[i][j], dp[i - 1][j] + grid[i][j]);
  }

  for (let j = 0; j < m; j++) {
    dp[i][j] = Math.max(left[j], right[j]);
  }
}

console.log(dp[n - 1][m - 1]);
