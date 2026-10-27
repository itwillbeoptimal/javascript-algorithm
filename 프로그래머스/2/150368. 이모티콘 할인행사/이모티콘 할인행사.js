function solution(users, emoticons) {
  let answer = [0, 0];

  const discountRates = [10, 20, 30, 40];

  const dfs = (current, spends, isSubscribed) => {
    if (current >= emoticons.length) {
      const subscribers = isSubscribed.filter(e => e).length;
      const profits = spends.reduce((acc, e) => acc + e, 0);

      if (answer[0] < subscribers) {
        answer[0] = subscribers;
        answer[1] = profits;
      } else if (answer[0] === subscribers && answer[1] < profits) {
        answer[1] = profits;
      }

      return;
    }

    for (const r of discountRates) {
      const discountPrice = (emoticons[current] * (100 - r)) / 100;
      const nextSpends = [...spends];
      const nextSubscribed = [...isSubscribed];

      for (let i = 0; i < users.length; i++) {
        if (isSubscribed[i]) continue;

        const [userRate, userPrice] = users[i];

        if (userRate <= r) {
          nextSpends[i] += discountPrice;
          if (nextSpends[i] >= userPrice) {
            nextSpends[i] = 0;
            nextSubscribed[i] = true;
          }
        }
      }

      dfs(current + 1, nextSpends, nextSubscribed);
    }
  }

  dfs(0, Array(users.length).fill(0), Array(users.length).fill(false));

  return answer;
}