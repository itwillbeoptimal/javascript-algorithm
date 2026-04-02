const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const n = Number(input[0]);
const graph = input.slice(1).map(row => row.split(" ").map(Number));

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < n; k++) {
      if (graph[j][i] && graph[i][k]) {
        graph[j][k] = 1;
      }
    }
  }
}

for (const row of graph) {
  console.log(row.join(" "));
}
