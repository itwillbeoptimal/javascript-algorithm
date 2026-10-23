function solution(enroll, referral, seller, amount) {
  const indexMap = new Map(enroll.map((name, i) => [name, i]));
  const parents = referral.map(name => (name === "-" ? -1 : indexMap.get(name)));
  const result = Array(enroll.length).fill(0);

  seller.forEach((name, i) => {
    let index = indexMap.get(name);
    let money = amount[i] * 100;

    while (index !== -1 && money > 0) {
      const share = Math.floor(money / 10);
      result[index] += money - share;
      index = parents[index];
      money = share;
    }
  });

  return result;
}