function solution(n, wires) {
  let answer = Infinity;
  const graph = Array.from({ length: n + 1 }, () => []);
  wires.forEach(wire => {
    graph[wire[0]].push(wire[1]);
    graph[wire[1]].push(wire[0]);
  });

  const dfs = (start, blockedA, blockedB) => {
    const visited = Array(n + 1).fill(false);
    let count = 0;
    const stack = [start];
    visited[start] = true;

    while (stack.length) {
      const node = stack.pop();
      count += 1;
      for (const next of graph[node]) {
        if ((next === blockedA && node === blockedB) || (next === blockedB && node === blockedA))
          continue;
        if (!visited[next]) {
          visited[next] = true;
          stack.push(next);
        }
      }
    }

    return count;
  };

  wires.forEach(([a, b]) => {
    let count = dfs(a, a, b);
    answer = Math.min(answer, Math.abs(n - count - count));
  });

  return answer;
}
