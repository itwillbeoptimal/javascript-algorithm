const fs = require("fs");
input = fs.readFileSync(0, "utf-8").trim().split("\n");

const [n, c] = input[0].split(" ").map(Number);
const houses = input
  .slice(1)
  .map(Number)
  .sort((a, b) => a - b);

let answer = -Infinity;

const bs = (start, end) => {
  if (start > end) return;

  const mid = Math.floor((start + end) / 2);
  let last = 0;
  let count = 1;

  for (let i = 1; i < n; i++) {
    if (count === c) break;
    if (houses[i] - houses[last] >= mid) {
      last = i;
      count++;
    }
  }

  if (count === c) {
    answer = Math.max(answer, mid);
    bs(mid + 1, end);
  } else {
    bs(start, mid - 1);
  }
};

bs(1, houses[n - 1] - houses[0]);
console.log(answer);
