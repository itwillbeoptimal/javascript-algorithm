function solution(s) {
  return s.map((string) => {
    const stack = [];
    let removed = 0;

    for (const char of string) {
      stack.push(char);
      const length = stack.length;

      if (
        length >= 3 &&
        stack[length - 3] === "1" &&
        stack[length - 2] === "1" &&
        stack[length - 1] === "0"
      ) {
        stack.length -= 3;
        removed++;
      }
    }

    const joined = stack.join("");
    const insertAt = joined.lastIndexOf("0") + 1;

    return joined.slice(0, insertAt) + "110".repeat(removed) + joined.slice(insertAt);
  });
}