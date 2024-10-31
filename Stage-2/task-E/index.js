/**
 * Удаление медиан
 */

function deletingMedians(n, setOfNumbers) {
    const result = [];
    let leftPtr = Math.floor((n - 2) / 2);
    let rightPtr = leftPtr + 1;

    setOfNumbers.sort((a, b) => a - b);

    for (let i = n - 1; i >= 0; i--) {
        if ((i + 1) % 2 === 1) {
            result.push(setOfNumbers[rightPtr++]);
        } else {
            result.push(setOfNumbers[leftPtr--]);
        }
    }

    return result;
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
    const setOfNumbers = readArray();

    const result = deletingMedians(n, setOfNumbers);

    console.log(result.join(" "));
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

module.exports = deletingMedians;
