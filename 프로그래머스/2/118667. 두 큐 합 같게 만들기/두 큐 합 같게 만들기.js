function solution(queue1, queue2) {
  let sum1 = queue1.reduce((acc, e) => acc + e, 0);
  let sum2 = queue2.reduce((acc, e) => acc + e, 0);

  if ((sum1 + sum2) % 2) return -1;

  const limit = queue1.length * 4;
  let head1 = 0;
  let head2 = 0;

  for (let answer = 0; answer <= limit; answer++) {
    if (sum1 === sum2) return answer;

    if (sum1 < sum2) {
      const value = queue2[head2++];
      queue1.push(value);
      sum1 += value;
      sum2 -= value;
    } else {
      const value = queue1[head1++];
      queue2.push(value);
      sum2 += value;
      sum1 -= value;
    }
  }

  return -1;
}