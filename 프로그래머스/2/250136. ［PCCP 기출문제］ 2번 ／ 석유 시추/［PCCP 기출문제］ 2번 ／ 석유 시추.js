function solution(land) {
  const rows = land.length;
  const cols = land[0].length;
  const oilByColumn = Array(cols).fill(0);

  const dy = [0, 1, 0, -1];
  const dx = [1, 0, -1, 0];

  const bfs = (startY, startX, columns) => {
    const queue = [[startY, startX]];
    let head = 0;
    let size = 1;

    while (head < queue.length) {
      const [y, x] = queue[head++];

      for (let i = 0; i < 4; i++) {
        const ny = y + dy[i];
        const nx = x + dx[i];

        if (ny < 0 || nx < 0 || ny >= rows || nx >= cols || land[ny][nx] === 0) {
          continue;
        }

        land[ny][nx] = 0;
        size++;
        columns.add(nx);
        queue.push([ny, nx]);
      }
    }

    return size;
  };

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (land[y][x] === 0) continue;

      land[y][x] = 0;

      const columns = new Set([x]);
      const oilSize = bfs(y, x, columns);

      for (const column of columns) {
        oilByColumn[column] += oilSize;
      }
    }
  }

  return Math.max(...oilByColumn);
}
