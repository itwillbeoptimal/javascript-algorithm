const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const [r, c] = input[0].split(" ").map(Number);
const grid = input.slice(1).map(rows => rows.split(""));

const dy = [0, 1, 0, -1];
const dx = [1, 0, -1, 0];

let answer = 1;
let visited = new Set([grid[0][0]]);

const dfs = (y, x) => {
  answer = Math.max(answer, visited.size);

  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];

    if (0 <= ny && ny < r && 0 <= nx && nx < c && !visited.has(grid[ny][nx])) {
      visited.add(grid[ny][nx]);
      dfs(ny, nx);
      visited.delete(grid[ny][nx]);
    }
  }
};

dfs(0, 0);
console.log(answer);
