function solution(tickets) {
  tickets.sort((a, b) => a[1].localeCompare(b[1]));

  let answer;

  const dfs = (path, remain) => {
    if (!remain.length) {
      answer = path;
      return true;
    }

    for (let i = 0; i < remain.length; i++) {
      if (remain[i][0] === path.at(-1)) {
        const next = [...remain];
        const ticket = next.splice(i, 1)[0];

        if (dfs([...path, ticket[1]], next)) return true;
      }
    }

    return false;
  };

  dfs(["ICN"], tickets);

  return answer;
}
