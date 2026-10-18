function solution(numbers) {
  const toFullBinaryTree = (num) => {
    const binary = num.toString(2);
    let length = 1;

    while (length < binary.length) {
      length = length * 2 + 1;
    }

    return binary.padStart(length, "0");
  };

  const isValidTree = (tree, start, end, parentIsZero) => {
    if (start > end) return true;

    const mid = Math.floor((start + end) / 2);
    const isZero = tree[mid] === "0";

    if (parentIsZero && !isZero) return false;

    return isValidTree(tree, start, mid - 1, isZero) && isValidTree(tree, mid + 1, end, isZero);
  };

  return numbers.map((num) => {
    const tree = toFullBinaryTree(num);
    return isValidTree(tree, 0, tree.length - 1, false) ? 1 : 0;
  });
}