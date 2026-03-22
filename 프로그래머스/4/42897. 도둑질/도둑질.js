function solution(money) {
  let n = money.length;
  let dp1 = Array(n).fill(-1);
  dp1[0] = money[0];
  dp1[1] = Math.max(money[0], money[1]);

  for (let i = 2; i < n - 1; i++) dp1[i] = Math.max(dp1[i - 2] + money[i], dp1[i - 1]);

  let dp2 = Array(n).fill(-1);
  dp2[1] = money[1];
  dp2[2] = Math.max(money[1], money[2]);

  for (let i = 3; i < n; i++) dp2[i] = Math.max(dp2[i - 2] + money[i], dp2[i - 1]);

  return Math.max(dp1[n - 2], dp2[n - 1]);
}