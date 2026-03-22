function solution(brown, yellow) {
  let totalBlocks = brown + yellow;
  let list = [];
  
  for (let i = 3; i <= Math.sqrt(totalBlocks); i++) {
    if (!(totalBlocks % i)) list.push([totalBlocks / i, i]);
  }

  return list.find(l => (l[0] - 2) * (l[1] - 2) === yellow);
}
