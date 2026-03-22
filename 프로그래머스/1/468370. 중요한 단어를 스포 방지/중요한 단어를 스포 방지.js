function solution(message, spoilerRanges) {
  let secretWords = new Set();
  let words = message.split(" ");
  let filteredMsg = [...message];
    
  spoilerRanges.forEach(range => {
    const [start, end] = range;
    for (let i = start; i <= end; i++) if (filteredMsg[i] !== " ") filteredMsg[i] = "*";
  });

  let filteredWords = filteredMsg.join("").split(" ");

  filteredWords.forEach((w, i) => {
    if (w.includes("*")) {
      let originalWord = words[i];
      if (!filteredWords.includes(originalWord)) secretWords.add(originalWord);
    }
  });

  return secretWords.size;
}