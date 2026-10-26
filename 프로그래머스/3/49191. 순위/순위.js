function solution(n, results) {
  const graph = Array.from({ length: n + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === j ? 0 : Infinity))
  );

  results.forEach(([winner, loser]) => {
    graph[winner][loser] = 1;
    graph[loser][winner] = -1;
  });

  for (let mid = 1; mid <= n; mid++) {
    for (let start = 1; start <= n; start++) {
      for (let end = 1; end <= n; end++) {
        if (graph[start][mid] === 1 && graph[mid][end] === 1) graph[start][end] = 1;
        if (graph[start][mid] === -1 && graph[mid][end] === -1) graph[start][end] = -1;
      }
    }
  }

  return graph
    .slice(1)
    .filter((row) => row.slice(1).every((result) => result !== Infinity))
    .length;
}