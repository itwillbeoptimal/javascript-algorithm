function solution(data, col, row_begin, row_end) {
  return data
    .sort((a, b) => a[col - 1] - b[col - 1] || b[0] - a[0])
    .map((e, i) => {
      const index = i + 1;
      if (row_begin <= index && index <= row_end) {
        return e.reduce((acc, current) => acc + (current % index), 0);
      } else {
        return -1;
      }
    })
    .filter(e => e >= 0)
    .reduce((acc, current) => acc ^ current, 0);
}