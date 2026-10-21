function solution(n, m, x, y, r, c, k) {
  const distance = (fromX, fromY) => Math.abs(fromX - r) + Math.abs(fromY - c);

  if (distance(x, y) > k || (k - distance(x, y)) % 2) {
    return "impossible";
  }

  const directions = [
    ["d", 1, 0],
    ["l", 0, -1],
    ["r", 0, 1],
    ["u", -1, 0],
  ];

  let answer = "";
  let cx = x;
  let cy = y;

  for (let i = 1; i <= k; i++) {
    const remaining = k - i;

    for (const [direction, dx, dy] of directions) {
      const nx = cx + dx;
      const ny = cy + dy;

      if (nx < 1 || nx > n || ny < 1 || ny > m) continue;
      if (distance(nx, ny) > remaining) continue;

      answer += direction;
      cx = nx;
      cy = ny;
      break;
    }
  }

  return answer;
}
