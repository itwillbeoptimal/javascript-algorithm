function solution(n, computers) {
  var answer = 0;

  let parent = [];
  for (let i = 0; i < n; i++) parent[i] = i;

  const find = x => {
    if (parent[x] === x) return x;
    return (parent[x] = find(parent[x]));
  };

  const union = (x, y) => {
    const s1 = find(x);
    const s2 = find(y);
    if (s1 < s2) parent[s2] = s1;
    else parent[s1] = s2;
  };

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      if (computers[i][j] === 1) union(i, j);
    }
  }

  let parentSet = new Set();
  for (let i = 0; i < n; i++) {
    parentSet.add(find(i));
  }

  return parentSet.size;
}