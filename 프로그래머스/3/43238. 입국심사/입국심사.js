function solution(n, times) {
  times.sort((a, b) => a - b);

  let start = times[0];
  let end = times[0] * n;
  let answer = end;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    const total = times.reduce((sum, time) => {
      return sum + Math.floor(mid / time);
    }, 0);

    if (total >= n) {
      answer = mid;
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return answer;
}