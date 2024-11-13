let fruits = ["Яблоко", "Апельсин", "Слива", 1];
const fruits1 = ["Яблоко", "Апельсин", "Слива", 2];
fruits1[0] = "Мандарин";
function test() {
    const fruits1 = ["Мандарин", "Клубника", "Смородина"];
    let fruits = ["Груша", "Крыжовник", "Агрэст", 4];
    fruits[0] = "Мандарин";
    console.log(fruits);
}
test();
console.log(fruits1);
console.log(fruits);
