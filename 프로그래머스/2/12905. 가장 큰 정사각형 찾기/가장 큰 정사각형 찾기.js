function solution(board) {
  const height = board.length;
  const width = board[0].length;
  const dp = board.map((row) => [...row]);

  let maxWidth = 0;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (i > 0 && j > 0 && dp[i][j]) {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      }
      maxWidth = Math.max(maxWidth, dp[i][j]);
    }
  }

  return maxWidth ** 2;
}