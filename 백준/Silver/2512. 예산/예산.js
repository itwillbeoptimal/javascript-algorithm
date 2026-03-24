const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const n = Number(input[0]);
const requests = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
let totalBudget = Number(input[2]);

if (requests.reduce((sum, v) => sum + v, 0) <= totalBudget) {
  console.log(requests[n - 1]);
} else {
  for (let i = 0; i < n; i++) {
    const cap = Math.floor(totalBudget / (n - i));
    if (requests[i] <= cap) {
      totalBudget -= requests[i];
    } else {
      console.log(cap);
      break;
    }
  }
}
