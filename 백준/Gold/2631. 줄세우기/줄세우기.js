const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const n = Number(input[0]);
const sequence = input.slice(1).map(Number);
const dp = Array(n).fill(1);

for (let i = 0; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (sequence[i] > sequence[j]) dp[i] = Math.max(dp[i], dp[j] + 1);
  }
}

console.log(n - Math.max(...dp));
