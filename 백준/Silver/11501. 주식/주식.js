const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const cases = input
  .slice(1)
  .filter((_, i) => i % 2)
  .map(v => v.split(" ").map(Number));

for (const prices of cases) {
  const n = prices.length;
  const suffixMax = new Array(n).fill(-Infinity);
  for (let i = n - 2; i >= 0; i--) {
    suffixMax[i] = Math.max(prices[i + 1], suffixMax[i + 1]);
  }

  let stockSum = 0,
    stockCount = 0,
    profit = 0;
  prices.forEach((price, i) => {
    if (price < suffixMax[i]) {
      stockSum += price;
      stockCount++;
    } else {
      profit += price * stockCount - stockSum;
      stockSum = 0;
      stockCount = 0;
    }
  });

  console.log(profit);
}
