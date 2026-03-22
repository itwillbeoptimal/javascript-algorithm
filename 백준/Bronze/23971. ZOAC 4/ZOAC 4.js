const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split(" ");

const [H, W, N, M] = input.map(Number);

const capacityPerCols = Math.floor((H - 1) / (N + 1)) + 1;
const capacityPerRows = Math.floor((W - 1) / (M + 1)) + 1;

console.log(capacityPerCols * capacityPerRows);
