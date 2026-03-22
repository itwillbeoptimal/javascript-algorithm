const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

for (const line of input) {
  const [a, b, c] = line.split(" ").map(Number);
  if (a === 0) break;

  let lines = [a, b, c].sort((a, b) => b - a);
  if (lines[0] >= lines[1] + lines[2]) {
    console.log("Invalid");
    continue;
  }

  let set = new Set(lines);

  if (set.size === 1) {
    console.log("Equilateral");
    continue;
  }
  if (set.size === 2) {
    console.log("Isosceles");
    continue;
  }

  console.log("Scalene");
}
