const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const cases = input.slice(1).map(Number);

const getMinNum = matches => {
  const dp = [null, null, 1n, 7n, 4n, 2n, 6n, 8n];
  const digits = [null, null, "1", "7", "4", "2", "0", "8"];

  for (let i = 8; i <= matches; i++) {
    dp[i] = Infinity;
    for (let j = 2; j < 8; j++) {
      if (i - j < 2) continue;
      let candidate = BigInt(String(dp[i - j]) + digits[j]);
      if (dp[i] > candidate) dp[i] = candidate;
    }
  }

  return String(dp[matches]);
};

const getMaxNum = matches => {
  if (matches === 3) return 7;
  let max = "1".repeat(Math.floor(matches / 2));
  if (matches % 2) {
    return "7" + max.slice(1);
  }
  return max;
};

for (const matches of cases) {
  console.log(getMinNum(matches), getMaxNum(matches));
}
