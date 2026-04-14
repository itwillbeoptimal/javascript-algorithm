const fs = require("fs");
const [n, r, c] = fs.readFileSync(0, "utf-8").trim().split(" ").map(Number);

const solve = (size, r, c, offset) => {
  if (size === 0) return offset;

  const half = 2 ** (size - 1);
  const quadrantSize = half ** 2;

  if (r < half && c < half) return solve(size - 1, r, c, offset);
  if (r < half && c >= half) return solve(size - 1, r, c - half, offset + quadrantSize);
  if (r >= half && c < half) return solve(size - 1, r - half, c, offset + quadrantSize * 2);
  return solve(size - 1, r - half, c - half, offset + quadrantSize * 3);
};

console.log(solve(n, r, c, 0));
