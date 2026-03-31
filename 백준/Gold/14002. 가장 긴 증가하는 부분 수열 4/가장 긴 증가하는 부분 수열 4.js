const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const n = Number(input[0]);
const sequence = input[1].split(" ").map(Number);

const dp = Array(n).fill(1);
const prev = Array(n).fill(-1);

for (let i = 0; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (sequence[i] > sequence[j] && dp[i] < dp[j] + 1) {
      dp[i] = dp[j] + 1;
      prev[i] = j;
    }
  }
}

let maxLen = 0;
let lastIndex = 0;

for (let i = 0; i < n; i++) {
  if (dp[i] > maxLen) {
    maxLen = dp[i];
    lastIndex = i;
  }
}

const lis = [];
while (lastIndex !== -1) {
  lis.push(sequence[lastIndex]);
  lastIndex = prev[lastIndex];
}

lis.reverse();

console.log(maxLen);
console.log(lis.join(" "));
