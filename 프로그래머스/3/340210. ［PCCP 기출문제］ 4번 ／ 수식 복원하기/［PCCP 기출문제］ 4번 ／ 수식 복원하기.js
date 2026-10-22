function solution(expressions) {
  const completed = [];
  const incomplete = [];
  let maxDigit = 0;

  for (const expression of expressions) {
    const [x, , y, , answer] = expression.split(" ");

    for (const char of x + y + answer) {
      if (char !== "X") maxDigit = Math.max(maxDigit, Number(char));
    }

    if (answer === "X") {
      incomplete.push(expression);
    } else {
      completed.push(expression);
    }
  }

  const calculate = (x, operation, y, base) => {
    const left = parseInt(x, base);
    const right = parseInt(y, base);
    return operation === "+" ? left + right : left - right;
  };

  const candidates = [];
  for (let base = Math.max(2, maxDigit + 1); base <= 9; base++) {
    candidates.push(base);
  }

  const validBases = candidates.filter((base) =>
      completed.every((expression) => {
        const [x, operation, y, , answer] = expression.split(" ");
        return calculate(x, operation, y, base) === parseInt(answer, base);
      })
  );

  return incomplete.map((expression) => {
    const [x, operation, y] = expression.split(" ");
    const results = new Set(
        validBases.map((base) => calculate(x, operation, y, base).toString(base))
    );
    const result = results.size === 1 ? [...results][0] : "?";
    return expression.replace("X", result);
  });
}