/**
 * Очередь в ПВЗ*
 */

Array.prototype.peek = function () {
    if (this.length === 0) {
        return;
    }
    return this[this.length - 1];
};

function failClientsCount(n, b, clients) {
    const prefix = Array(n + 1);
    prefix[0] = 0n;
    const processing = BigInt(b);

    let inQueue = 0n;
    for (let i = 0; i < n; i++) {
        inQueue += BigInt(clients[i]);
        if (inQueue <= processing) {
            inQueue = 0n;
        } else {
            inQueue -= processing;
        }
        prefix[i + 1] = prefix[i] + BigInt(clients[i]) + inQueue;
    }

    return prefix[n].toString();
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
    const [n, b] = readArray();
    const clients = readArray();

    const result = failClientsCount(n, b, clients);

    console.log(result);
}

function readAllString() {
    var arr = _inputLines.map((line) => line.trim());

    return arr;
}

function readString() {
    var str = _inputLines[_curLine] || "";
    _curLine++;
    return str.trim(" ");
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

module.exports = failClientsCount;
