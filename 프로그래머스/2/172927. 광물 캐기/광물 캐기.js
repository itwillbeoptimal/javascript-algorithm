function solution(picks, minerals) {
  const fatigue = {
    diamond: [1, 5, 25],
    iron: [1, 1, 5],
    stone: [1, 1, 1],
  };

  let answer = Infinity;

  const dfs = (start, remainPicks, tired) => {
    if (start >= minerals.length || remainPicks.every((count) => !count)) {
      answer = Math.min(answer, tired);
      return;
    }

    const end = Math.min(start + 5, minerals.length);

    for (let pick = 0; pick < 3; pick++) {
      if (!remainPicks[pick]) continue;

      let nextTired = tired;
      for (let i = start; i < end; i++) {
        nextTired += fatigue[minerals[i]][pick];
      }

      const nextPicks = [...remainPicks];
      nextPicks[pick]--;
      dfs(end, nextPicks, nextTired);
    }
  };

  dfs(0, picks, 0);
  return answer;
}