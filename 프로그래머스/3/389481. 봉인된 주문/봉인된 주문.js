function solution(n, bans) {
  const CHAR_CODE_A = 'a'.charCodeAt(0);
    
  const toIndex = (word) => {
    let index = 0;
    for (const char of word) {
      index = index * 26 + (char.charCodeAt(0) - CHAR_CODE_A + 1);
    }
    return index;
  };

  const toWord = (index) => {
    const chars = [];
    while (index > 0) {
      index--;
      chars.push(String.fromCharCode(CHAR_CODE_A + (index % 26)));
      index = Math.floor(index / 26);
    }
    return chars.reverse().join("");
  };

  const banIndexes = bans.map(toIndex).sort((a, b) => a - b);

  for (const banIndex of banIndexes) {
    if (banIndex > n) break;
    n++;
  }
    
  return toWord(n);
}
