function solution(plans) {
  const answer = [];
  const paused = [];

  const toMinute = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    return hour * 60 + minute;
  };

  const sortedPlans = plans
      .map(([name, start, playtime]) => [name, toMinute(start), Number(playtime)])
      .sort((a, b) => a[1] - b[1]);

  for (let i = 0; i < sortedPlans.length - 1; i++) {
    const [name, start, playtime] = sortedPlans[i];
    const nextStart = sortedPlans[i + 1][1];
    let freeTime = nextStart - (start + playtime);

    if (freeTime < 0) {
      paused.push([name, -freeTime]);
      continue;
    }

    answer.push(name);

    while (paused.length && freeTime > 0) {
      const top = paused[paused.length - 1];

      if (top[1] <= freeTime) {
        freeTime -= top[1];
        answer.push(paused.pop()[0]);
      } else {
        top[1] -= freeTime;
        freeTime = 0;
      }
    }
  }

  answer.push(sortedPlans[sortedPlans.length - 1][0]);

  while (paused.length) {
    answer.push(paused.pop()[0]);
  }

  return answer;
}
