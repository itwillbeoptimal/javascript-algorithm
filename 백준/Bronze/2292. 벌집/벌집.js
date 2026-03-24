const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim();

const n = Number(input);

let layer = 1;
let max = 1;

while (n > max) {
  max += 6 * layer;
  layer++;
}

console.log(layer);
