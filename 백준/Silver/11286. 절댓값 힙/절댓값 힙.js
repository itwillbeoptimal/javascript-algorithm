const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

class Heap {
  constructor(compare) {
    this.heap = [];
    this.compare = compare;
  }

  get size() {
    return this.heap.length;
  }

  get peek() {
    return this.heap[0];
  }

  push(value) {
    this.heap.push(value);
    this._up();
  }

  pop() {
    if (this.size === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._down();
    return top;
  }

  _up() {
    let i = this.size - 1;
    while (i > 0) {
      let p = Math.floor((i - 1) / 2);
      if (this.compare(this.heap[i], this.heap[p])) {
        [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
        i = p;
      } else break;
    }
  }

  _down() {
    let i = 0;
    while (true) {
      let l = i * 2 + 1;
      let r = i * 2 + 2;
      let target = i;

      if (l < this.size && this.compare(this.heap[l], this.heap[target])) {
        target = l;
      }
      if (r < this.size && this.compare(this.heap[r], this.heap[target])) {
        target = r;
      }
      if (target === i) break;

      [this.heap[i], this.heap[target]] = [this.heap[target], this.heap[i]];
      i = target;
    }
  }
}

const minHeap = new Heap((a, b) => {
  if (Math.abs(a) === Math.abs(b)) return a < b;
  return Math.abs(a) < Math.abs(b);
});
const answer = [];
input
  .slice(1)
  .map(Number)
  .forEach(v => {
    if (v === 0) {
      if (minHeap.size === 0) answer.push(0);
      else answer.push(minHeap.pop());
    } else {
      minHeap.push(v);
    }
  });

console.log(answer.join("\n"));
