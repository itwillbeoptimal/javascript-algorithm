function solution(maps) {
  let answer = [];

  const board = maps.map(row => row.split(""));

  const height = maps.length;
  const width = maps[0].length;

  const dy = [1, 0, -1, 0];
  const dx = [0, 1, 0, -1];

  const calculate = (startY, startX) => {
    let sum = Number(board[startY][startX]);

    const visited = Array.from({ length: height }, () => Array(width).fill(false));
    const queue = [[startY, startX]];
    let head = 0;
    visited[startY][startX] = true;

    while (queue.length > head) {
      const [y, x] = queue[head++];

      for (let i = 0; i < 4; i++) {
        const ny = y + dy[i];
        const nx = x + dx[i];

        if (ny >= 0 && ny < height && nx >= 0 && nx < width && !visited[ny][nx]) {
          if (board[ny][nx] !== "X") {
            visited[ny][nx] = true;
            sum += Number(board[ny][nx]);
            board[ny][nx] = "X";
            queue.push([ny, nx]);
          }
        }
      }
    }

    return sum;
  };

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (board[i][j] !== "X") {
        answer.push(calculate(i, j));
      }
    }
  }

  return answer.length ? answer.toSorted((a, b) => a - b) : [-1];
}
