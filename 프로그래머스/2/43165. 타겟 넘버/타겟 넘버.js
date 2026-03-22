function solution(numbers, target) {
  let answer = 0;
  let sums = [0];

  numbers.forEach(number => {
    const nextSums = [];
    for (const sum of sums) {
      nextSums.push(sum + number);
      nextSums.push(sum - number);
    }
    sums = nextSums;
  });

  sums.forEach(sum => {
    if (sum === target) {
      answer += 1;
    }
  });

  return answer;
}