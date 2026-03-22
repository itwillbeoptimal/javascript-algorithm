function solution(cost, hint) {
  let costMap = new Map();
  let hintMap = new Map();
  let tickets = Array(cost.length + 1).fill(0);

  cost.forEach((c, i) => costMap.set(i + 1, c));
  hint.forEach((h, i) => hintMap.set(i + 1, h));

  let answer = Infinity;

  const dfs = (currentStage, currentCost, currentTickets) => {
    if (currentStage > cost.length) {
      answer = Math.min(answer, currentCost);
      return;
    }

    const stageCosts = costMap.get(currentStage);
    const numOfTicket = Math.min(currentTickets[currentStage], stageCosts.length - 1);

    dfs(currentStage + 1, currentCost + stageCosts[numOfTicket], [...currentTickets]);

    const hintData = hintMap.get(currentStage);
    if (hintData) {
      const [hintCost, ...rest] = hintData;
      let newTickets = [...currentTickets];
      rest.forEach(r => (newTickets[r] = newTickets[r] + 1));
      dfs(currentStage + 1, currentCost + stageCosts[numOfTicket] + hintCost, newTickets);
    }
  };

  dfs(1, 0, tickets);
  return answer;
}