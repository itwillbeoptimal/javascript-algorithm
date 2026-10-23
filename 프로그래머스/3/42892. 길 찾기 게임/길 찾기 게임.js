function solution(nodeinfo) {
  const result = [];

  const n = nodeinfo.length;
  const nodes = nodeinfo
    .map(([x, y], i) => ({ id: i + 1, x, y, left: null, right: null }))
    .sort((a, b) => b.y - a.y);

  for (let i = 1; i < n; i++) {
    const node = nodes[i];
    let current = nodes[0];

    while (true) {
      if (node.x < current.x) {
        if (current.left === null) {
          current.left = node;
          break;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = node;
          break;
        }
        current = current.right;
      }
    }
  }

  const preorder = [];
  const postorder = [];

  const traverse = node => {
    if (node === null) return;

    preorder.push(node.id);
    traverse(node.left);
    traverse(node.right);
    postorder.push(node.id);
  };

  traverse(nodes[0]);

  return [preorder, postorder];
}