/**
 * Плот
 */

function raft(raftCoords, swimmerCoords) {
    const [xR1, yR1, xR2, yR2] = raftCoords;
    const [x, y] = swimmerCoords;
    const hash = (x >= xR2 ? 1 : 0) + (y >= yR2 ? 2 : 0) + (x <= xR1 ? 4 : 0) + (y <= yR1 ? 8 : 0);

    const directions = {
        1: "E",
        2: "N",
        3: "NE",
        4: "W",
        6: "NW",
        8: "S",
        9: "SE",
        12: "SW",
    };

    return directions[hash];
}

const _readline = require("readline");

const _reader = _readline.createInterface({
    input: process.stdin,
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
