function solution(n, infection, edges, k) {
  let answer = 0;
  let initialInfected = Array(n + 1).fill(false);
  initialInfected[infection] = true;

  let graphs = [
    null,
    Array.from({ length: n + 1 }, () => []),
    Array.from({ length: n + 1 }, () => []),
    Array.from({ length: n + 1 }, () => []),
  ];

  edges.forEach(([x, y, type]) => {
    graphs[type][x].push(y);
    graphs[type][y].push(x);
  });

  const spread = (pipeType, infected) => {
    const graph = graphs[pipeType];
    const queue = [];
    infected.forEach((isInfected, i) => {
      if (isInfected) queue.push(i);
    });
    while (queue.length) {
      const node = queue.shift();
      for (const neighbor of graph[node]) {
        if (!infected[neighbor]) {
          infected[neighbor] = true;
          queue.push(neighbor);
        }
      }
    }
    return infected;
  };

  const simulate = (remainingTurns, infected) => {
    if (remainingTurns === k) {
      const infectedCount = infected.filter(v => v).length;
      answer = Math.max(answer, infectedCount);
      return;
    }
    for (let pipeType = 1; pipeType <= 3; pipeType++) {
      const nextInfected = spread(pipeType, [...infected]);
      simulate(remainingTurns + 1, nextInfected);
    }
  };

  simulate(0, initialInfected);
  return answer;
}
