const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim();

let word = input.toUpperCase();

let charMap = new Map();
let maxCount = 0;

for (let char of word) {
  let count = (charMap.get(char) || 0) + 1;
  charMap.set(char, count);
  maxCount = Math.max(maxCount, count);
}

let answer = "";
let isDuplicate = false;

for (let [char, count] of charMap) {
  if (count === maxCount) {
    if (answer) {
      isDuplicate = true;
      break;
    }
    answer = char;
  }
}

console.log(isDuplicate ? "?" : answer);
