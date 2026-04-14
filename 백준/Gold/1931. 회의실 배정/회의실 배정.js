const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

let meetings = input
  .slice(1)
  .map(value => value.split(" ").map(Number))
  .sort((a, b) => {
    if (a[1] !== b[1]) return a[1] - b[1];
    else return a[0] - b[0];
  });

let time = 0;
let answer = 0;

for (const [start, end] of meetings) {
  if (time <= start) {
    answer += 1;
    time = end;
  }
}

console.log(answer);
