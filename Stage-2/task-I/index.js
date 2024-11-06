/**
 * Префиксные суммы
 */

Array.prototype.peek = function () {
    if (this.length === 0) {
        return;
    }
    return this[this.length - 1];
};

function learningAlgorithms(n, a, b, moods) {
    const vizited = new Uint8Array(n);
    const orderByBest = new Int32Array(n);
    const orderByBad = new Int32Array(n);
    const result = new Int32Array(n);
    for (let i = 0; i < n; i++) {
        orderByBest[i] = i;
        orderByBad[i] = i;
    }

    orderByBest.sort((iA, iB) => b[iB] - b[iA] || a[iB] - a[iA] || iA - iB);
    orderByBad.sort((iA, iB) => a[iB] - a[iA] || b[iB] - b[iA] || iA - iB);

    let ptrBest = 0;
    let ptrBad = 0;

    for (let i = 0; i < n; i++) {
        if (moods[i] == 1) {
            while (vizited[orderByBest[ptrBest]] > 0) {
                ptrBest++;
            }
            result[i] = orderByBest[ptrBest] + 1;
            vizited[orderByBest[ptrBest]] = 1;
            ptrBest++;
        } else {
            while (vizited[orderByBad[ptrBad]] > 0) {
                ptrBad++;
            }
            result[i] = orderByBad[ptrBad] + 1;
            vizited[orderByBad[ptrBad]] = 1;
            ptrBad++;
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
    const interestingness = readArray();
    const helpfulness = readArray();
    const moods = readArray();

    const result = learningAlgorithms(n, interestingness, helpfulness, moods);
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

module.exports = learningAlgorithms;
