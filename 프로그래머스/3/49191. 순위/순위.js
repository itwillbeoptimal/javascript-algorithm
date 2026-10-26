function solution(n, results) {
  let answer = 0;

  const winGraph = Array.from({ length: n + 1 }, () => []);
  const loseGraph = Array.from({ length: n + 1 }, () => []);

  results.forEach(([winner, loser]) => {
    winGraph[winner].push(loser);
    loseGraph[loser].push(winner);
  });

  const visited = Array(n + 1).fill(false);

  for (let i = 1; i <= n; i++) {
    const winQueue = [i];
    const loseQueue = [i];
    const visited = Array(n + 1).fill(false);
    visited[0] = true;
    visited[i] = true;
    let head = 0;

    while (winQueue.length > head) {
      const current = winQueue[head++];
      for (const next of winGraph[current]) {
        if (!visited[next]) {
          winQueue.push(next);
          visited[next] = true;
        }
      }
    }

    head = 0;
    while (loseQueue.length > head) {
      const current = loseQueue[head++];
      for (const next of loseGraph[current]) {
        if (!visited[next]) {
          loseQueue.push(next);
          visited[next] = true;
        }
      }
    }

    if (visited.every(e => e)) answer++;
  }

  return answer;
}
