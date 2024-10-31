/**
 * 93. Город Че
 *
 * В центре города Че есть пешеходная улица - одно из самых популярных мест для прогулок жителей города.
 * По этой улице очень приятно гулять, ведь вдоль улицы расположено n забавных памятников.
 * Девочке Маше из города Че нравятся два мальчика из её школы, и она никак не может сделать выбор между ними.
 * Чтобы принять окончательное решение, она решила назначить обоим мальчикам свидание в одно и то же время.
 * Маша хочет выбрать два памятника на пешеходной улице, около которых мальчики будут её ждать. При этом она
 * хочет выбрать такие памятники, чтобы мальчики не увидели друг друга. Маша знает, что из-за тумана мальчики
 * увидят друг друга только в том случае, если они будут на расстоянии не более r метров.
 * Маше заинтересовалась, а сколько способов есть выбрать два различных памятника для организации свиданий?
 *
 * Формат ввода:
 * В первой строке входного файла находятся два целых числа n и r (2 ≤ n ≤ 300000, 1 ≤ r ≤ 10^9) - количество
 * памятников и максимальное расстояние, на котором мальчики могут увидеть друг друга.
 * Во второй строке задано n положительных чисел d1, …, dn, где d[i] - расстояние от i-го памятника до начала улицы.
 * Все памятники находятся на разном расстоянии от начала улицы. Памятники приведены в порядке возрастания расстояния
 * от начала улицы (1 ≤ d1, d2, …, dn ≤ 10^9).
 *
 * Формат вывода:
 * Выведите одно число - число способов выбрать два памятника для организации свиданий.
 */

function countRendezvous(n, r, distMonuments) {
    let count = 0;
    let right = 1;
    if (n > 1) {
        for (let left = 0; left < n; left++) {
            while (right < n && distMonuments[right] - distMonuments[left] <= r) {
                right++;
            }
            if (distMonuments[right] - distMonuments[left] > r) {
                count += n - right;
            }
        }
    }
    return count;
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
    const params = readArray();
    const n = params[0];
    const r = params[1];
    const distMonuments = readArray();

    const result = countRendezvous(n, r, distMonuments);

    console.log(result);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine]
        .trim(" ")
        .split(" ")
        .map((num) => Number(num));
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

module.exports = countRendezvous;
