function solution(word) {
  const vowels = ["A", "E", "I", "O", "U"];
  const dictionary = [];

  function dfs(word) {
    if (word.length > 5) return;

    if (word.length > 0) {
      dictionary.push(word);
    }

    for (const v of vowels) {
      dfs(word + v);
    }
  }

  dfs("");

  return dictionary.indexOf(word) + 1;
}
