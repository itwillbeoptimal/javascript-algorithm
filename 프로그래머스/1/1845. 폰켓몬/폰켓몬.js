function solution(nums) {
  let num = 0;
  let set = new Set();
  for (let n of nums) {
    if (num === nums.length / 2) break;
    if (set.has(n)) continue;
    set.add(n);
    num += 1;
  }
  return set.size;
}
