function solution(want, number, discount) {
  const indexOf = new Map(want.map((item, i) => [item, i]));
  const cart = Array(want.length).fill(0);
  let result = 0;

  for (let day = 0; day < discount.length; day++) {
    if (indexOf.has(discount[day])) {
      cart[indexOf.get(discount[day])]++;
    }

    if (day >= 10 && indexOf.has(discount[day - 10])) {
      cart[indexOf.get(discount[day - 10])]--;
    }

    if (day >= 9 && cart.every((count, i) => count >= number[i])) {
      result++;
    }
  }

  return result;
}