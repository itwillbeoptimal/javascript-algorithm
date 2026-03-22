function solution(n, results) {
  let winGraph = Array.from({ length: n + 1 }, () => []);
  let loseGraph = Array.from({ length: n + 1 }, () => []);

  results.forEach(result => {
    const [a, b] = result;
    winGraph[a].push(b);
    loseGraph[b].push(a);
  });

  let answer = 0;
  for (let i = 1; i <= n; i++) {
    let visited = Array(n + 1).fill(false);
    visited[0] = true;
    visited[i] = true;

    let winQueue = [i];
    while (winQueue.length) {
      let current = winQueue.shift();
      for (const next of winGraph[current]) {
        if (!visited[next]) {
          winQueue.push(next);
          visited[next] = true;
        }
      }
    }

    let loseQueue = [i];
    while (loseQueue.length) {
      let current = loseQueue.shift();
      for (const next of loseGraph[current]) {
        if (!visited[next]) {
          loseQueue.push(next);
          visited[next] = true;
        }
      }
    }
    if (visited.every(e => e)) answer += 1;
  }

  return answer;
}
