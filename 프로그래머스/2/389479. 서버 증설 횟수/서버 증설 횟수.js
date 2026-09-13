function solution(players, m, k) {
  let answer = 0;
  let n = players.length;
  let requiredServers = players.map(p => Math.floor(p / m));
  let servers = Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    if (servers[i] < requiredServers[i]) {
      let needs = requiredServers[i] - servers[i];
      answer += needs;
      for (let j = 0; j < k; j++) {
        servers[i + j] += needs;
      }
    }
  }

  return answer;
}