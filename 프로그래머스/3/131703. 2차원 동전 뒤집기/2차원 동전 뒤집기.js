function solution(beginning, target) {
  const height = beginning.length;
  const width = beginning[0].length;
  const rowFlipMap = new Map();
  const colFlipMap = new Map();

  const rowFlip = (row, board) => {
    for (let i = 0; i < width; i++) {
      board[row][i] ^= 1;
    }
    return board;
  };

  const colFlip = (col, board) => {
    for (let i = 0; i < height; i++) {
      board[i][col] ^= 1;
    }
    return board;
  };

  const rowDfs = (start, board, flippedCount) => {
    rowFlipMap.set(board.flat().join(""), flippedCount);

    for (let i = start; i < height; i++) {
      rowDfs(
        i + 1,
        rowFlip(
          i,
          board.map(row => [...row]),
        ),
        flippedCount + 1,
      );
    }
  };

  const colDfs = (start, board, flippedCount) => {
    colFlipMap.set(board.flat().join(""), flippedCount);

    for (let i = start; i < width; i++) {
      colDfs(
        i + 1,
        colFlip(
          i,
          board.map(row => [...row]),
        ),
        flippedCount + 1,
      );
    }
  };

  rowDfs(0, beginning, 0);
  colDfs(0, target, 0);

  let answer = Infinity;
    
  for (const [key, count] of rowFlipMap.entries()) {  
    if (colFlipMap.has(key)) {
      answer = Math.min(answer, count + colFlipMap.get(key));
    }
  }

  return answer === Infinity ? -1 : answer;
}