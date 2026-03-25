const fs = require("fs");
input = fs.readFileSync(0, "utf-8").trim().split("\n");

const [n, s] = input[0].split(" ").map(Number);
const sequence = input[1].split(" ").map(Number);

let left = 0;
let sum = 0;
let answer = Infinity;

for (let right = 0; right < n; right++) {
  sum += sequence[right];

  while (sum >= s) {
    answer = Math.min(answer, right - left + 1);
    sum -= sequence[left];
    left++;
  }
}

console.log(answer === Infinity ? 0 : answer);
