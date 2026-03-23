const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const [n, k] = input[0].split(" ").map(Number);

let grid = Array.from({ length: n }, () => Array(n).fill(null));
input[1]
  .split(" ")
  .map(Number)
  .forEach((count, col) => {
    grid[n - 1][col] = count;
  });

const dr = [0, 1];
const dc = [1, 0];

const findStackedCols = () => {
  let colHeights = Array(n).fill(0);
  grid.forEach(row => {
    row.forEach((value, col) => {
      if (value) colHeights[col]++;
    });
  });
  let stackedCols = colHeights.reduce((acc, height, col) => {
    if (height > 1) acc.push(col);
    return acc;
  }, []);
  return [stackedCols, Math.max(...colHeights)];
};

const extractColumns = (colIndexes, height) => {
  let extracted = Array.from({ length: height }, () => Array(colIndexes.length));
  colIndexes.forEach((colIdx, localIdx) => {
    for (let i = 0; i < height; i++) {
      extracted[height - 1 - i][localIdx] = grid[n - 1 - i][colIdx];
      grid[n - 1 - i][colIdx] = null;
    }
  });
  return extracted;
};

const rotateClockwise = tanks => {
  let rowCount = tanks.length;
  let colCount = tanks[0].length;
  let rotated = Array.from({ length: colCount }, () => Array(rowCount));
  tanks.forEach((row, i) => {
    row.forEach((value, j) => {
      rotated[j][rowCount - i - 1] = value;
    });
  });
  return rotated;
};

const rotate180 = tanks => rotateClockwise(rotateClockwise(tanks));

const placeOnGrid = (tanks, yOffset = 1) => {
  let rowCount = tanks.length;
  let colCount = tanks[0].length;
  let targetCol = 0;
  while (targetCol < n && !grid[n - 1][targetCol]) targetCol++;
  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < colCount; j++) {
      grid[n - i - 1 - yOffset][targetCol + j] = tanks[rowCount - i - 1][j];
    }
  }
};

const addFishToMin = () => {
  let minCount = Math.min(...grid[n - 1]);
  grid[n - 1] = grid[n - 1].map(count => (count === minCount ? count + 1 : count));
};

const liftLeftmost = () => {
  grid[n - 2][1] = grid[n - 1][0];
  grid[n - 1][0] = null;
};

const stackPhase = () => {
  while (true) {
    let [stackedCols, maxHeight] = findStackedCols();
    if (maxHeight > n - stackedCols.length * maxHeight) break;
    placeOnGrid(rotateClockwise(extractColumns(stackedCols, maxHeight)));
  }
};

const equalizeFish = () => {
  let fishDiff = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let d = 0; d < 2; d++) {
        let ni = i + dr[d];
        let nj = j + dc[d];
        if (ni < n && nj < n && grid[i][j] && grid[ni][nj]) {
          let amount = Math.floor(Math.abs(grid[i][j] - grid[ni][nj]) / 5);
          if (amount > 0) {
            if (grid[i][j] > grid[ni][nj]) {
              fishDiff[ni][nj] += amount;
              fishDiff[i][j] -= amount;
            } else {
              fishDiff[i][j] += amount;
              fishDiff[ni][nj] -= amount;
            }
          }
        }
      }
    }
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] !== null) grid[i][j] += fishDiff[i][j];
    }
  }
};

const flattenToBottom = () => {
  let orderedCounts = [];
  for (let col = 0; col < n; col++) {
    for (let row = n - 1; row >= 0; row--) {
      if (grid[row][col]) orderedCounts.push(grid[row][col]);
    }
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      grid[i][j] = i < n - 1 ? null : (orderedCounts[j] ?? null);
    }
  }
};

const foldPhase = () => {
  placeOnGrid(
    rotate180(
      extractColumns(
        Array.from({ length: n / 2 }, (_, i) => i),
        1,
      ),
    ),
  );
  placeOnGrid(
    rotate180(
      extractColumns(
        Array.from({ length: n / 4 }, (_, i) => n / 2 + i),
        2,
      ),
    ),
    2,
  );
};

const isBalanced = () => {
  let min = Math.min(...grid[n - 1]);
  let max = Math.max(...grid[n - 1]);
  return max - min <= k;
};

let answer = 0;

while (true) {
  answer++;

  addFishToMin();
  liftLeftmost();
  stackPhase();

  equalizeFish();
  flattenToBottom();

  foldPhase();

  equalizeFish();
  flattenToBottom();

  if (isBalanced()) break;
}

console.log(answer);
