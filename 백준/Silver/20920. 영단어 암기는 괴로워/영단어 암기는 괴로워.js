const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

const [_, m] = input[0].split(" ").map(Number);
const words = input.slice(1);

let map = new Map();
words.forEach(word => {
  if (word.length >= m) map.set(word, (map.get(word) || 0) + 1);
});

let dict = [...map.keys()];
dict.sort((a, b) => {
  const freqA = map.get(a);
  const freqB = map.get(b);

  if (freqA > freqB) return -1;
  else if (freqA < freqB) return 1;

  if (a.length > b.length) return -1;
  else if (a.length < b.length) return 1;

  return a.localeCompare(b);
});

console.log(dict.join("\n"));
