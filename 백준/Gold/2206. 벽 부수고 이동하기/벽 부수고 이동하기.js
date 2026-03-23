const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const grid = input.slice(1).map(line => line.split("").map(Number));
const dy = [1, 0, -1, 0];
const dx = [0, 1, 0, -1];

let distance = Array.from({ length: n }, () => Array.from({ length: m }, () => Array(2).fill(0)));

const bfs = () => {
  let queue = [[0, 0, 0]];
  let head = 0;
  distance[0][0][0] = 1;

  while (head < queue.length) {
    const [cy, cx, hasBroken] = queue[head++];

    for (let i = 0; i < 4; i++) {
      let ny = cy + dy[i];
      let nx = cx + dx[i];

      if (0 <= ny && ny < n && 0 <= nx && nx < m) {
        if (grid[ny][nx] === 0 && !distance[ny][nx][hasBroken]) {
          distance[ny][nx][hasBroken] = distance[cy][cx][hasBroken] + 1;
          queue.push([ny, nx, hasBroken]);
        }
        if (grid[ny][nx] === 1 && hasBroken === 0 && !distance[ny][nx][1]) {
          distance[ny][nx][1] = distance[cy][cx][hasBroken] + 1;
          queue.push([ny, nx, 1]);
        }
      }
    }
  }
};

bfs();

const result = Math.min(
  distance[n - 1][m - 1][0] || Infinity,
  distance[n - 1][m - 1][1] || Infinity,
);

console.log(result === Infinity ? -1 : result);
