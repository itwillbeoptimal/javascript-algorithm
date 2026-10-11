function solution(n, roads, sources, destination) {
  const graph = Array.from({ length: n + 1 }, () => []);

  roads.forEach(([a, b]) => {
    graph[a].push(b);
    graph[b].push(a);
  });

  const distances = Array(n + 1).fill(-1);
  distances[destination] = 0;

  const queue = [destination];
  let head = 0;

  while (head < queue.length) {
    const village = queue[head++];

    for (const node of graph[village]) {
      if (distances[node] !== -1) continue;

      distances[node] = distances[village] + 1;
      queue.push(node);
    }
  }

  return sources.map((source) => distances[source]);
}