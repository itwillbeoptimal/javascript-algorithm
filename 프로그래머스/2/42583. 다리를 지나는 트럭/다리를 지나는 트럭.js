function solution(bridgeLength, weight, waitingTrucks) {
  let crossingTrucks = [];
  let answer = 1;

  while (crossingTrucks.length || waitingTrucks.length) {
    if (waitingTrucks.length) {
      let currentWeights = crossingTrucks.length
        ? crossingTrucks.reduce((sum, truck) => sum + truck[0], 0)
        : 0;
      if (currentWeights + waitingTrucks[0] <= weight)
        crossingTrucks.push([waitingTrucks.shift(), 0]);
    }

    if (crossingTrucks.length) {
      crossingTrucks.forEach((_, i) => {
        crossingTrucks[i] = [crossingTrucks[i][0], crossingTrucks[i][1] + 1];
      });
    }

    crossingTrucks = crossingTrucks.filter(t => t[1] < bridgeLength);
    answer += 1;
  }

  return answer;
}
