/**
 * Удаление медиан
 */

function summary3thMultiplication(n, setOfNumbers) {
    const base = 10n ** 9n + 7n;
    const doubleBase = 10n ** 9n + 7n;

    let prev = 0n;
    const bigIntSet = setOfNumbers.map((n) => BigInt(n));
    const prefix = bigIntSet.map((n) => {
        prev = (prev + n) % doubleBase;
        return prev;
    });

    let result = 0n;
    for (let i = 1; i < n - 1; i++) {
        result =
            (result + ((((prefix[i - 1] * bigIntSet[i]) % base) * (prefix[n - 1] - (prefix[i] % base))) % base)) % base;
    }

    return result.toString();
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

    const result = summary3thMultiplication(n, setOfNumbers);

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

module.exports = summary3thMultiplication;
