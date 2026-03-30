const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const cases = input.slice(1).map(Number);

const APPEND_DIGIT = ["1", "7", "4", "2", "0", "8"];

const getMinNum = matches => {
  const dp = [null, null, 1n, 7n, 4n, 2n, 6n, 8n];

  for (let i = 8; i <= matches; i++) {
    dp[i] = null;
    for (let cost = 2; cost <= 7; cost++) {
      const prev = i - cost;
      if (prev < 2 || dp[prev] === null) continue;
      const candidate = BigInt(String(dp[prev]) + APPEND_DIGIT[cost - 2]);
      if (dp[i] === null || candidate < dp[i]) dp[i] = candidate;
    }
  }

  return String(dp[matches]);
};

const getMaxNum = matches => {
  const ones = "1".repeat(Math.floor(matches / 2));
  return matches % 2 ? "7" + ones.slice(1) : ones;
};

for (const matches of cases) {
  console.log(getMinNum(matches), getMaxNum(matches));
}
