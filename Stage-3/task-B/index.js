/**
 * 144. Великое Лайнландское переселение
 *
 * Лайнландия представляет из себя одномерный мир, являющийся прямой, на котором располагаются N городов,
 * последовательно пронумерованных от 0 до N - 1 . Направление в сторону от первого города к нулевому названо
 * западным, а в обратную — восточным.
 * Когда в Лайнландии неожиданно начался кризис, все были жители мира стали испытывать глубокое смятение.
 * По всей Лайнландии стали ходить слухи, что на востоке живётся лучше, чем на западе.
 * Так и началось Великое Лайнландское переселение. Обитатели мира целыми городами отправились на восток,
 * покинув родные улицы, и двигались до тех пор, пока не приходили в город, в котором средняя цена проживания
 * была меньше, чем в родном.
 *
 * Формат ввода:
 * В первой строке дано одно число N (2 ≤ N ≤ 10^5) — количество городов в Лайнландии.
 * Во второй строке дано N чисел a[i] (0 ≤ a[i] ≤ 10^9) — средняя цена проживания в городах
 * с нулевого по (N - 1)-ый соответственно.
 *
 * Формат вывода:
 * Для каждого города в порядке с нулевого по (N - 1)-ый выведите номер города, в который переселятся
 * его изначальные жители. Если жители города не остановятся в каком-либо другом городе, отправившись
 * в Восточное Бесконечное Ничто, выведите -1 .
 *
 * Примечания:
 */

function greatLinelandMigration(lands) {
    const n = lands.length;
    const migration = [];
    const stack = [];

    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && stack[stack.length - 1].level > lands[i]) {
            const migrant = stack.pop();
            migration[migrant.city] = i;
        }
        stack.push({ level: lands[i], city: i });
    }

    while (stack.length > 0) {
        const migrant = stack.pop();
        migration[migrant.city] = -1;
    }

    return migration;
}

const _readline = require("readline");

const _reader = _readline.createInterface({
    input: process.stdin
});

const _inputLines = [];
let _curLine = 0;

_reader.on("line", (line) => {
    _inputLines.push(line);
});

process.stdin.on("end", solve);

function solve() {
    const n = readInt();
    const lands = readArray();

    const result = greatLinelandMigration(lands);

    console.log(result.join(" "));
}

function readAllString() {
    var arr = _inputLines.map((line) => line.trim());

    return arr;
}

function readString() {
    var str = _inputLines[_curLine].trim(" ");
    _curLine++;
    return str;
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}
function readBigInt() {
    const n = BigInt(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine]
        .trim(" ")
        .split(" ")
        .filter((str) => str && str.length > 0)
        .map((num) => Number(num));
    _curLine++;
    return arr;
}

function readBigIntArray() {
    var arr = _inputLines[_curLine]
        .trim(" ")
        .split(" ")
        .map((num) => BigInt(num));
    _curLine++;
    return arr;
}

function readStringArray() {
    var arr = _inputLines[_curLine]
        .trim(" ")
        .split(" ")
        .filter((str) => str && str.length > 0);
    _curLine++;
    return arr;
}

function readEdges(n) {
    let grid = [];
    for (let i = 0; i < n; i++) {
        let vertex = readArray();
        grid.push(vertex);
    }
    return grid;
}

module.exports = greatLinelandMigration;
