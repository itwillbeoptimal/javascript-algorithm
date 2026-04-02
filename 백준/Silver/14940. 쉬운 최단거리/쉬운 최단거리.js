const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const grid = input.slice(1).map(rows => rows.split(" ").map(Number));
const distance = Array.from({ length: n }, () => Array(m).fill(0));

const dy = [0, 1, 0, -1];
const dx = [1, 0, -1, 0];

let head = 0;
const queue = [];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (grid[i][j] === 2) queue.push([i, j]);
  }
}

while (queue.length > head) {
  const [y, x] = queue[head++];
  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];
    if (0 <= ny && ny < n && 0 <= nx && nx < m && grid[ny][nx] === 1 && !distance[ny][nx]) {
      distance[ny][nx] = distance[y][x] + 1;
      queue.push([ny, nx]);
    }
  }
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (!distance[i][j] && grid[i][j] === 1) distance[i][j] = -1;
  }
}

for (const row of distance) console.log(row.join(" "));
