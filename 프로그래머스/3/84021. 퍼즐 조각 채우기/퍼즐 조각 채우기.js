function solution(game_board, table) {
  const n = game_board.length;
  const dy = [0, 1, 0, -1];
  const dx = [1, 0, -1, 0];

  const getBlock = (board, y, x, target) => {
    const stack = [[y, x]];
    const block = [];
    board[y][x] = -1;

    while (stack.length) {
      const [cy, cx] = stack.pop();
      block.push([cy, cx]);

      for (let i = 0; i < 4; i++) {
        const ny = cy + dy[i];
        const nx = cx + dx[i];
        if (ny >= 0 && nx >= 0 && ny < n && nx < n && board[ny][nx] === target) {
          board[ny][nx] = -1;
          stack.push([ny, nx]);
        }
      }
    }
    return block;
  };

  const normalize = block => {
    let minY = Infinity;
    let minX = Infinity;

    block.forEach(([y, x]) => {
      minY = Math.min(minY, y);
      minX = Math.min(minX, x);
    });

    const normalized = block.map(([y, x]) => [y - minY, x - minX]);
    normalized.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
    return normalized;
  };

  const rotate = block => {
    return block.map(([y, x]) => [x, -y]);
  };

  const getRotations = block => {
    const rotations = [];
    let current = block;

    for (let i = 0; i < 4; i++) {
      current = normalize(current);
      rotations.push(current);
      current = rotate(current);
    }
    return rotations;
  };

  const emptyBlocks = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (game_board[i][j] === 0) {
        const block = getBlock(game_board, i, j, 0);
        emptyBlocks.push(normalize(block));
      }
    }
  }

  const puzzleBlocks = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (table[i][j] === 1) {
        const block = getBlock(table, i, j, 1);
        puzzleBlocks.push(block);
      }
    }
  }

  const used = Array(puzzleBlocks.length).fill(false);
  let answer = 0;

  for (const empty of emptyBlocks) {
    for (let i = 0; i < puzzleBlocks.length; i++) {
      if (used[i]) continue;
      if (empty.length !== puzzleBlocks[i].length) continue;

      const rotations = getRotations(puzzleBlocks[i]);

      let matched = false;
      for (const rotated of rotations) {
        let same = true;
        for (let k = 0; k < empty.length; k++) {
          if (empty[k][0] !== rotated[k][0] || empty[k][1] !== rotated[k][1]) {
            same = false;
            break;
          }
        }
        if (same) {
          matched = true;
          break;
        }
      }

      if (matched) {
        used[i] = true;
        answer += empty.length;
        break;
      }
    }
  }

  return answer;
}
