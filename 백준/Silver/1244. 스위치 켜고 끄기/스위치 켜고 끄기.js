const fs = require("fs");
input = fs.readFileSync(0, "utf-8").trim().split("\n");

let n = Number(input[0]);
const switches = input[1].split(" ").map(Number);
const students = Array.from({ length: Number(input[2]) }, () => []);
input.slice(3).forEach((v, i) => {
  students[i] = v.split(" ").map(Number);
});

const toggle = number => {
  if (switches[number - 1] === 0) switches[number - 1] = 1;
  else switches[number - 1] = 0;
};

students.forEach(student => {
  const [gender, number] = student;
  if (gender === 1) {
    for (let i = number; i <= n; i += number) {
      toggle(i);
    }
  } else {
    toggle(number);

    let prev = number - 1;
    let next = number + 1;

    while (prev >= 1 && next <= n && switches[prev - 1] === switches[next - 1]) {
      toggle(prev);
      toggle(next);
      prev--;
      next++;
    }
  }
});

for (let i = 0; i < n; i += 20) {
  console.log(switches.slice(i, i + 20).join(" "));
}
