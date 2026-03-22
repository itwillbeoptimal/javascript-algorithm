function solution(arr) {
  let answer = [arr[0]];
  arr.forEach(value => {
    if (value !== answer[answer.length - 1]) answer.push(value);
  });
  return answer;
}
