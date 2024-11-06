/**
 * Цензурное произведение
 */

function censoredProduct(n, c, s) {
    const splitedString = s.split("");
    const prefixA = Array(n + 1);
    const prefixB = Array(n + 1);
    prefixA[0] = 0;
    prefixB[0] = 0;
    splitedString.forEach((c, i) => {
        if (c === "a") {
            prefixA[i + 1] = prefixA[i] + 1;
            prefixB[i + 1] = prefixB[i];

            return c;
        }

        if (c === "b") {
            prefixB[i + 1] = prefixB[i] + 1;
            prefixA[i + 1] = prefixA[i];

            return c;
        }

        prefixA[i + 1] = prefixA[i];
        prefixB[i + 1] = prefixB[i];
    });

    let first = 0;
    let cntA = 0;
    let cntB = 0;
    let cntAll = 0;
    let max = 0;
    for (let left = 0; left < n; left++) {
        while (first < n && cntAll <= c) {
            if (splitedString[first] === "a") {
                cntA++;
            }
            if (splitedString[first] === "b") {
                max = Math.max(max, first - left);
                cntB++;
                cntAll += cntA;
            }
            first++;
        }
        if (cntAll <= c) max = Math.max(max, first - left);
        if (cntB > 0) {
            if (splitedString[left] === "a") cntAll -= cntB;
            if (splitedString[left] === "b") cntB--;
        }
        if (splitedString[left] === "a") cntA--;
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
    const c = params[1];
    const s = readString();

    const result = censoredProduct(n, c, s);

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

module.exports = censoredProduct;
