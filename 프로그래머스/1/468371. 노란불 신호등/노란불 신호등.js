function solution(signals) {
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const lcm = (a, b) => (a * b) / gcd(a, b);

  const periods = signals.map(([g, y, r]) => g + y + r);
  const totalLcm = periods.reduce((acc, p) => lcm(acc, p), 1);

  for (let t = 1; t <= totalLcm; t++) {
    const allYellow = signals.every(([g, y, r], i) => {
      const rem = (t - 1) % periods[i];
      return rem >= g && rem < g + y;
    });
    if (allYellow) return t;
  }

  return -1;
}