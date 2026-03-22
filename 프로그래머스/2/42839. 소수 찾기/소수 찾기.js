function solution(numbers) {
  const set = new Set();
  const digits = numbers.split("");
  const used = Array(digits.length).fill(false);

  const dfs = current => {
    if (current.length > 0) {
      set.add(Number(current));
    }

    for (let i = 0; i < digits.length; i++) {
      if (used[i]) continue;

      used[i] = true;
      dfs(current + digits[i]);
      used[i] = false;
    }
  };

  const isPrime = number => {
    if (number < 2) return false;
    for (let i = 2; i <= Math.sqrt(number); i++) {
      if (number % i === 0) return false;
    }
    return true;
  };

  dfs("");

  let answer = 0;
  for (const num of set) {
    if (isPrime(num)) answer++;
  }

  return answer;
}
