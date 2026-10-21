function solution(info, edges) {
  let answer = 0;
  const graph = Array.from({ length: info.length }, () => []);
  edges.forEach(([a, b]) => graph[a].push(b));

  const dfs = (sheep, wolves, reachables) => {
    if (sheep <= wolves) return;
    answer = Math.max(answer, sheep);

    for (const next of reachables) {
      const nextReachables = reachables.filter((node) => node !== next).concat(graph[next]);

      if (info[next]) {
        dfs(sheep, wolves + 1, nextReachables);
      } else {
        dfs(sheep + 1, wolves, nextReachables);
      }
    }
  };

  dfs(1, 0, graph[0]);

  return answer;
}
