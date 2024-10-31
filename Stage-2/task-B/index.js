/**
 * 91. Сумма номеров
 *
 * Вася очень любит везде искать своё счастливое число K. Каждый день он ходит в школу по улице, вдоль которой
 * припарковано N машин. Он заинтересовался вопросом, сколько существует наборов машин, стоящих подряд на местах
 * с L до R, что сумма их номеров равна K. Помогите Васе узнать ответ на его вопрос.
 * Например, если число N=5 ,  K=17 , а номера машин равны 17, 7, 10, 7, 10, то существует 4 набора машин:
 * 17       ( L = 1 , R = 1 ),
 * 7, 10    ( L = 2 , R = 3 ),
 * 10, 7    ( L = 3 , R = 4 ),
 * 7, 10    ( L = 4 , R = 5 )
 *
 * Формат ввода:
 * В первой строке входных данных задаются числа N и K (1 ≤ N ≤ 100000, 1 ≤ K ≤ 10^9).Во второй строке
 * содержится N чисел, задающих номера машин. Номера машин могут принимать значения от 1 до 999 включительно.
 *
 * Формат вывода:
 * Необходимо вывести одно число — количество наборов.
 */

function countSumOfNumbers(n, k, nums) {
    let count = 0;
    let sum = 0;
    let l = 0;
    let r = 0;

    while (r < n && l < n) {
        if (sum + nums[r] <= k) {
            sum += nums[r];
            r++;
        } else {
            sum -= nums[l];
            l++;
        }
        if (sum === k) {
            count++;
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
    const k = params[1];
    const nums = readArray();

    const result = countSumOfNumbers(n, k, nums);

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

module.exports = countSumOfNumbers;
