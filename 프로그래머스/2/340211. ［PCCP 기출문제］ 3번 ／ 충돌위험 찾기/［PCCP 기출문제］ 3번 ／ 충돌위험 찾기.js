function solution(points, routes) {
  const visitCount = new Map();
  let answer = 0;

  const record = (time, y, x) => {
    const key = `${time},${y},${x}`;
    const count = (visitCount.get(key) ?? 0) + 1;
    visitCount.set(key, count);
    if (count === 2) answer++;
  };

  routes.forEach((route) => {
    let [y, x] = points[route[0] - 1];
    let time = 0;
    record(time++, y, x);

    for (let i = 1; i < route.length; i++) {
      const [targetY, targetX] = points[route[i] - 1];

      while (y !== targetY) {
        y += y < targetY ? 1 : -1;
        record(time++, y, x);
      }
      while (x !== targetX) {
        x += x < targetX ? 1 : -1;
        record(time++, y, x);
      }
    }
  });

  return answer;
}
