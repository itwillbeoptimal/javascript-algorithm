const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const [, , l, k] = input[0].split(" ").map(Number);
const stars = input.slice(1).map(s => s.split(" ").map(Number));

let answer = Infinity;

stars.forEach(([x]) => {
  stars.forEach(([, y]) => {
    let covered = 0;
    stars.forEach(([sx, sy]) => {
      if (x <= sx && sx <= x + l && y - l <= sy && sy <= y) {
        covered += 1;
      }
    });
    answer = Math.min(answer, k - covered);
  });
});

console.log(answer);
