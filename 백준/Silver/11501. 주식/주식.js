const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const cases = input
  .slice(1)
  .filter((_, i) => i % 2)
  .map(v => v.split(" ").map(Number));

for (const prices of cases) {
  let max = 0;
  let profit = 0;

  for (let i = prices.length - 1; i >= 0; i--) {
    if (prices[i] > max) {
      max = prices[i];
    } else {
      profit += max - prices[i];
    }
  }

  console.log(profit);
}
