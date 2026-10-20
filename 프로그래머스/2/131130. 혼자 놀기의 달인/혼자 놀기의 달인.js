function solution(cards) {
  const isOpened = Array(cards.length).fill(false);
  const groupSizes = [];

  for (let start = 0; start < cards.length; start++) {
    if (isOpened[start]) continue;

    let size = 0;
    let current = start;

    while (!isOpened[current]) {
      isOpened[current] = true;
      current = cards[current] - 1;
      size++;
    }

    groupSizes.push(size);
  }

  groupSizes.sort((a, b) => b - a);

  return groupSizes[0] * (groupSizes[1] ?? 0);
}