/**
 * Плот
 */

function raft(raftCoords, swimmerCoords) {
    const directions = {
        NW: ([x, y], [x1, _1, _2, y2]) => (x1 - x) ** 2 + (y2 - y) ** 2,
        N: ([x, y], [x1, _1, x2, y2]) => Math.min(Math.abs(x1 + 0.5 - x), Math.abs(x2 - 0.5 - x)) ** 2 + (y2 - y) ** 2,
        NE: ([x, y], [_1, _2, x2, y2]) => (x2 - x) ** 2 + (y2 - y) ** 2,
        E: ([x, y], [_, y1, x2, y2]) => (x2 - x) ** 2 + Math.min(Math.abs(y1 + 0.5 - y), Math.abs(y2 - 0.5 - y)) ** 2,
        SE: ([x, y], [_1, y1, x2, _2]) => (x2 - x) ** 2 + (y1 - y) ** 2,
        S: ([x, y], [x1, y1, x2, _]) => Math.min(Math.abs(x1 + 0.5 - x), Math.abs(x2 - 0.5 - x)) ** 2 + (y1 - y) ** 2,
        SW: ([x, y], [x1, y1, _1, _2]) => (x1 - x) ** 2 + (y1 - y) ** 2,
        W: ([x, y], [x1, y1, _, y2]) => (x1 - x) ** 2 + Math.min(Math.abs(y1 + 0.5 - y), Math.abs(y2 - 0.5 - y)) ** 2
    };

    let result = "";
    let minDistance = Infinity;
    for (let dir in directions) {
        const distance = directions[dir](swimmerCoords, raftCoords);
        if (minDistance >= distance) {
            result = dir;
            minDistance = distance;
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
    const raftCoords = [];
    const swimmerCoords = [];
    for (let i = 0; i < 4; i++) {
        raftCoords.push(readInt());
    }
    for (let i = 0; i < 2; i++) {
        swimmerCoords.push(readInt());
    }

    const result = raft(raftCoords, swimmerCoords);

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

module.exports = raft;
