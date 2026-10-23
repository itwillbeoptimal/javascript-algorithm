function solution(board, skill) {
  const height = board.length;
  const width = board[0].length;
  const delta = Array.from({ length: height + 1 }, () => Array(width + 1).fill(0));

  for (const [type, r1, c1, r2, c2, degree] of skill) {
    const amount = type === 1 ? -degree : degree;

    delta[r1][c1] += amount;
    delta[r1][c2 + 1] -= amount;
    delta[r2 + 1][c1] -= amount;
    delta[r2 + 1][c2 + 1] += amount;
  }

  for (let row = 1; row < height; row++) {
    for (let col = 0; col < width; col++) {
      delta[row][col] += delta[row - 1][col];
    }
  }

  for (let row = 0; row < height; row++) {
    for (let col = 1; col < width; col++) {
      delta[row][col] += delta[row][col - 1];
    }
  }

  let answer = 0;

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (board[row][col] + delta[row][col] > 0) answer++;
    }
  }

  return answer;
}