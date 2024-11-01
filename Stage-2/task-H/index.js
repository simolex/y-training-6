/**
 * Префиксные суммы
 */

Array.prototype.peek = function () {
    if (this.length === 0) {
        return;
    }
    return this[this.length - 1];
};

function relocation(n, offices) {
    const prefixOffice = offices.reduce(
        (prefix, v) => {
            prefix.push(prefix.peek() + BigInt(v));
            return prefix;
        },
        [0n]
    );

    let fromLeft = 0n;
    let fromRight = 0n;
    for (let i = n - 1; i > 0; i--) {
        fromRight += prefixOffice[n] - prefixOffice[i];
    }

    let min = fromLeft + fromRight;
    for (let i = 1; i < n; i++) {
        fromLeft += prefixOffice[i];
        fromRight -= prefixOffice[n] - prefixOffice[i];
        if (min > fromLeft + fromRight) min = fromLeft + fromRight;
    }

    return min.toString();
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
    const offices = readArray();

    const result = relocation(n, offices);
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

module.exports = relocation;
