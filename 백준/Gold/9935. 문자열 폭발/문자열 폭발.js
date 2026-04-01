const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const string = input[0];
const pattern = input[1];

const stack = [];
const pLen = pattern.length;
const lastChar = pattern[pLen - 1];

for (let char of string) {
  stack.push(char);

  if (char === lastChar && stack.length >= pLen) {
    let isMatch = true;

    for (let i = 0; i < pLen; i++) {
      if (stack[stack.length - pLen + i] !== pattern[i]) {
        isMatch = false;
        break;
      }
    }

    if (isMatch) {
      stack.length -= pLen;
    }
  }
}

const result = stack.join("");
console.log(result || "FRULA");
