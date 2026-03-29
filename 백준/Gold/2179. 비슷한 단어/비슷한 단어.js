const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const n = Number(input[0]);
const original = [...new Set(input.slice(1))];
const sorted = original
  .map((word, index) => [word, index])
  .sort((a, b) => a[0].localeCompare(b[0]));

const commonPrefixLen = (a, b) => {
  let count = 0;
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] !== b[i]) break;
    count++;
  }
  return count;
};

let maxLen = 0;
const prefixMap = new Map();

for (let i = 0; i < sorted.length - 1; i++) {
  const len = commonPrefixLen(sorted[i][0], sorted[i + 1][0]);
  const prefix = sorted[i][0].slice(0, len);
  if (len === maxLen) {
    const entry = prefixMap.get(prefix);
    if (entry) {
      entry.push(sorted[i][1], sorted[i + 1][1]);
    } else {
      prefixMap.set(prefix, [sorted[i][1], sorted[i + 1][1]]);
    }
  } else if (len > maxLen) {
    maxLen = len;
    prefixMap.clear();
    prefixMap.set(prefix, [sorted[i][1], sorted[i + 1][1]]);
  }
}

const candidates = [...prefixMap.entries()]
  .map(([_, indexes]) => [...new Set(indexes)].sort((a, b) => a - b))
  .sort((a, b) => a[0] - b[0]);

console.log(original[candidates[0][0]]);
console.log(original[candidates[0][1]]);
