function solution(genres, plays) {
  let gMap = new Map();
  let gCountMap = new Map();

  genres.forEach((g, i) => {
    gMap.set(g, [...(gMap.get(g) || []), i]);
    gCountMap.set(g, (gCountMap.get(g) || 0) + plays[i]);
  });

  gMap.forEach((value, key) => {
    value.sort((a, b) => plays[b] - plays[a]);
    if (gMap.get(key).length > 2) gMap.set(key, value.slice(0, 2));
  });

  return [...gMap.entries()]
    .sort((a, b) => gCountMap.get(b[0]) - gCountMap.get(a[0]))
    .map(g => g[1])
    .flat();
}