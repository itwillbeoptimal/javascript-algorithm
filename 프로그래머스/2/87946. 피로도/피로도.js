function solution(k, dungeons) {
  let visited = Array(dungeons.length).fill(false);
  let answer = 0;

  const dfs = (fatigue, count) => {
    answer = Math.max(answer, count);

    for (let i = 0; i < dungeons.length; i++) {
      if (visited[i]) continue;

      const [need, cost] = dungeons[i];
      if (need > fatigue) continue;

      visited[i] = true;
      dfs(fatigue - cost, count + 1);
      visited[i] = false;
    }
  };

  dfs(k, 0);

  return answer;
}
