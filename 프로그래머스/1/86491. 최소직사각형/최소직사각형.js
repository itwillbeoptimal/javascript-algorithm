function solution(sizes) {
  let maxLength = Math.max(...sizes.flat());
  let otherLength = 0;

  sizes.forEach(size => {
    let smallerSide = Math.min(size[0], size[1]);

    if (smallerSide > otherLength) {
      otherLength = smallerSide;
    }
  });

  return maxLength * otherLength;
}
