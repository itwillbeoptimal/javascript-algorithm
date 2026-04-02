const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const n = Number(input[0]);
const graph = input.slice(1).map(rows => rows.split(" ").map(Number));
const answer = [];

const bfs = start => {
  let head = 0;
  const queue = [start];
  const connected = Array(n).fill(0);

  while (queue.length > head) {
    let current = queue[head++];

    for (let i = 0; i < n; i++) {
      if (graph[current][i] && !connected[i]) {
        connected[i] = 1;
        queue.push(i);
      }
    }
  }

  answer.push(connected);
};

for (let i = 0; i < n; i++) {
  bfs(i);
}

for (const row of answer) {
  console.log(row.join(" "));
}
