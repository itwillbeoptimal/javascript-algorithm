function solution(numbers) {
  const n = numbers.length;
  const result = Array(n).fill(0);

  const toFullBinaryTree = (n) => {
    let binary = n.toString(2);
    let length = 1;

    while (length < binary.length) {
      length = length * 2 + 1;
    }

    return binary.padStart(length, "0");
  };

  const isValidTree = (tree) => {
    const { length } = tree;
    const mid = Math.floor(length / 2);

    if (length === 1) return true;

    const left = tree.slice(0, mid);
    const right = tree.slice(mid + 1);

    if (tree[mid] === 0) {
      if (left.includes(1) || right.includes(1)) {
        return false;
      }
    }

    return isValidTree(left) && isValidTree(right);
  };

  numbers.forEach((n, i) => {
    const fullBinaryTree = toFullBinaryTree(n).split("").map(Number);
    result[i] = isValidTree(fullBinaryTree) ? 1 : 0;
  });

  return result;
}