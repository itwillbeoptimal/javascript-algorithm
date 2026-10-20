function solution(n, k, cmd) {
  const prev = Array.from({ length: n }, (_, i) => i - 1);
  const next = Array.from({ length: n }, (_, i) => (i + 1 < n ? i + 1 : -1));
  const isDeleted = Array(n).fill(false);
  const stack = [];

  cmd.forEach((input) => {
    const [command, value] = input.split(" ");
    const count = Number(value);

    switch (command) {
      case "U":
        for (let i = 0; i < count; i++) k = prev[k];
        break;
      case "D":
        for (let i = 0; i < count; i++) k = next[k];
        break;
      case "C": {
        stack.push(k);
        isDeleted[k] = true;

        if (prev[k] !== -1) next[prev[k]] = next[k];
        if (next[k] !== -1) prev[next[k]] = prev[k];

        k = next[k] !== -1 ? next[k] : prev[k];
        break;
      }
      case "Z": {
        const restore = stack.pop();
        isDeleted[restore] = false;

        if (prev[restore] !== -1) next[prev[restore]] = restore;
        if (next[restore] !== -1) prev[next[restore]] = restore;
        break;
      }
    }
  });

  return isDeleted.map((deleted) => (deleted ? "X" : "O")).join("");
}