const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split(" ");

const [a, b] = input.map(BigInt);

function count(N) {
  let n = BigInt(N);
  let result = 0n;

  for (let i = 0n; i <= 60n; i++) {
    let block = 1n << (i + 1n);
    let half = block / 2n;

    let repeatCount = (n + 1n) / block;
    result += repeatCount * half;

    let remainder = (n + 1n) % block;
    if (remainder > half) {
      result += remainder - half;
    }
  }

  return result;
}

console.log((count(b) - count(a - 1n)).toString());
