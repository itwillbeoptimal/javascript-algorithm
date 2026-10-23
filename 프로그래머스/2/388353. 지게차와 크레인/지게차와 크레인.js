function solution(storage, requests) {
  let out = 0;

  const height = storage.length;
  const width = storage[0].length;
  const board = Array.from({ length: height + 2 }, () => Array(width + 2).fill("*"));
  const dy = [1, 0, -1, 0];
  const dx = [0, 1, 0, -1];

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      board[i + 1][j + 1] = storage[i][j];
    }
  }

  const isReachable = (y, x) => {
    const queue = [[0, 0]];
    const visited = Array.from({ length: height + 2 }, () => Array(width + 2).fill(false));
    let head = 0;
    visited[0][0] = true;

    while (queue.length > head) {
      const current = queue[head++];

      for (let i = 0; i < 4; i++) {
        const ny = current[0] + dy[i];
        const nx = current[1] + dx[i];

        if (ny >= 0 && ny < height + 2 && nx >= 0 && nx < width + 2 && !visited[ny][nx]) {
          if (ny === y && nx === x) {
            return true;
          } else if (board[ny][nx] === "*") {
            visited[ny][nx] = true;
            queue.push([ny, nx]);
          }
        }
      }
    }

    return false;
  };

  for (let k = 0; k < requests.length; k++) {
    const command = requests[k];
    const target = command[0];

    if (command.length === 2) {
      for (let i = 1; i <= height; i++) {
        for (let j = 1; j <= width; j++) {
          if (board[i][j] === target) {
            board[i][j] = "*";
            out++;
          }
        }
      }
    } else {
      const stack = [];

      for (let i = 1; i <= height; i++) {
        for (let j = 1; j <= width; j++) {
          if (board[i][j] === target && isReachable(i, j)) {
            stack.push([i, j]);
            out++;
          }
        }
      }

      while (stack.length) {
        const [y, x] = stack.pop();
        board[y][x] = "*";
      }
    }
  }

  return width * height - out;
}
