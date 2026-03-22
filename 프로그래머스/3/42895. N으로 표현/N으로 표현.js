function solution(N, number) {
  if (N === number) return 1;

  let dp = Array.from({ length: 9 }, () => []);
  dp[1].push(N);

  for (let i = 2; i < 9; i++) {
    let set = new Set([Number(String(N).repeat(i))]);
    for (let j = 1; j < i; j++) {
      dp[i - j].forEach(a => {
        dp[j].forEach(b => {
          set.add(a + b);
          set.add(a - b);
          set.add(a * b);
          set.add(Math.floor(a / b));
        });
      });
    }
    if (set.has(number)) return i;
    dp[i] = [...set];
  }

  return -1;
}
