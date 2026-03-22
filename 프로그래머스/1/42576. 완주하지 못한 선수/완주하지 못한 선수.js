function solution(participant, completion) {
  let pMap = new Map();
  participant.forEach(p => {
    pMap.set(p, (pMap.get(p) || 0) + 1);
  });

  let cMap = new Map();
  completion.forEach(c => {
    cMap.set(c, (cMap.get(c) || 0) + 1);
  });

  for (let p of pMap) {
    if (!cMap.has(p[0])) return p[0];
    if (cMap.get(p[0]) !== p[1]) return p[0];
  }
}
