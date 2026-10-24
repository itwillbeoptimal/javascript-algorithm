function solution(k, ranges) {
  const sequence = [k];

  while (sequence.at(-1) !== 1) {
    const current = sequence.at(-1);
    if (current % 2) {
      sequence.push(current * 3 + 1);
    } else {
      sequence.push(current / 2);
    }
  }

  const n = sequence.length - 1;

  const integral = range => {
    let [a, b] = range;

    if (b <= 0) b = n + b;
    if (a > b) return -1;

    let sum = 0;

    for (let i = a; i < b; i++) {
      const currentY = sequence[i];
      const nextY = sequence[i + 1];
      let diffY = Math.abs(currentY - nextY);

      sum += diffY / 2 + Math.min(currentY, nextY);
    }

    return sum;
  };

  return ranges.map(range => integral(range));
}