function solution(sequence, k) {
  const answer = [0, Infinity];

  let left = 0;
  let right = 0;
  let sum = 0;

  for (; right < sequence.length; right++) {
    sum += sequence[right];
    while (sum >= k) {
      if (sum === k && right - left < answer[1] - answer[0]) {
        answer[0] = left;
        answer[1] = right;
      }
      sum -= sequence[left++];
    }
  }

  return answer;
}