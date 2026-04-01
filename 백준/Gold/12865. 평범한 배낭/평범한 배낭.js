const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const [, k] = input[0].split(" ").map(Number);
const items = input.slice(1).map(v => v.split(" ").map(Number));

const dp = Array(k + 1).fill(0);

for (const [w, v] of items) {
  for (let i = k; i >= w; i--) {
    dp[i] = Math.max(dp[i], dp[i - w] + v);
  }
}

console.log(Math.max(...dp));
