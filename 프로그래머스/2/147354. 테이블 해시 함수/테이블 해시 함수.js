function solution(data, col, row_begin, row_end) {
  return data
    .sort((a, b) => a[col - 1] - b[col - 1] || b[0] - a[0])
    .slice(row_begin - 1, row_end)
    .map((row, i) => {
      const index = row_begin + i;
      return row.reduce((sum, value) => sum + (value % index), 0);
    })
    .reduce((acc, current) => acc ^ current, 0);
}
