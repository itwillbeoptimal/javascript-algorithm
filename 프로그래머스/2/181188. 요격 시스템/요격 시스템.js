function solution(targets) {
  targets.sort((a, b) => a[1] - b[1]);

  let answer = 0;
  let lastEnd = 0;

  for (const [start, end] of targets) {
    if (start >= lastEnd) {
      answer++;
      lastEnd = end;
    }
  }

  return answer;
}