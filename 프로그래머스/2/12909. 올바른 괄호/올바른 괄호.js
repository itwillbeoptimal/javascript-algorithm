function solution(s) {
  let queue = [...s];
  let left = 0;
  let right = 0;

  for (let i = 0; i < queue.length; i++) {
    if (queue[i] === "(") left += 1;
    else right += 1;

    if (left < right) return false;

    if (i === queue.length - 1) {
      if (left === right) return true;
      return false;
    }
  }
}
