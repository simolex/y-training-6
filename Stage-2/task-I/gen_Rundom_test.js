const n = 10 ** 5; // кол-во алгоритмов

const a = Array(n)
    .fill()
    .map(() => Math.floor(Math.random() * n) + 1);
const b = Array(n)
    .fill()
    .map(() => Math.floor(Math.random() * n) + 1);

const c = Array(n)
    .fill()
    .map(() => (Math.random() > 0.6 ? 1 : 0));

console.log(n);
console.log(a.join(" "));
console.log(b.join(" "));
console.log(c.join(" "));
