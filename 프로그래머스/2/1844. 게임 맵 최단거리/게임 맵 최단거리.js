function solution(maps) {
  const rows = maps.length;
  const cols = maps[0].length;
  const dy = [1, 0, -1, 0];
  const dx = [0, 1, 0, -1];
  const queue = [[0, 0, 1]];

  maps[0][0] = 0;

  while (queue.length) {
    const [y, x, dist] = queue.shift();

    if (y === rows - 1 && x === cols - 1) return dist;

    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];
      if (ny >= 0 && nx >= 0 && ny < rows && nx < cols && maps[ny][nx]) {
        queue.push([ny, nx, dist + 1]);
        maps[ny][nx] = 0;
      }
    }
  }
  return -1;
}
