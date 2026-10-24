function solution(info, n, m) {
  let states = new Set([`${n},${m}`]);

  for (const [traceA, traceB] of info) {
    const next = new Set();

    for (const state of states) {
      const [remainA, remainB] = state.split(",").map(Number);
      if (traceA < remainA) next.add(`${remainA - traceA},${remainB}`);
      if (traceB < remainB) next.add(`${remainA},${remainB - traceB}`);
    }

    if (!next.size) return -1;
    states = next;
  }

  let answer = Infinity;
  for (const state of states) {
    const [remainA] = state.split(",").map(Number);
    answer = Math.min(answer, n - remainA);
  }

  return answer;
}