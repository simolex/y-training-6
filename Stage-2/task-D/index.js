/**
 * Цензурное произведение
 */

function theBestHoliday(n, k, tasks) {
    let max = 0;
    tasks.sort((a, b) => a - b);

    let first = 1;
    for (let last = 0; last < n; last++) {
        while (first < n && tasks[first] - tasks[last] <= k) {
            first++;
        }
        max = Math.max(max, first - last);
    }
    return max;
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
    const tasks = readArray();

    const result = theBestHoliday(n, k, tasks);
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

function readString() {
    const s = _inputLines[_curLine].trim();
    _curLine++;
    return s;
}

module.exports = theBestHoliday;
