function solution(clothes) {
  let map = new Map();
  clothes.forEach(c => {
    let [, category] = c;
    map.set(category, (map.get(category) || 1) + 1);
  });

  return [...map.values()].reduce((acc, item) => acc * item, 1) - 1;
}