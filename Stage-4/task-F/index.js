/**
 * Бюрократия
 */

function bureaucracy(n, bosses) {
    const result = Array(n + 1).fill(1);
    const count = Array(n + 1).fill(1);

    let current;
    for (let i = bosses.length - 1; i >= 0; i--) {
        current = i + 2;

        if (result[current] === 1) {
            count[bosses[i]] += 1;
            result[bosses[i]] += 2;
        } else if (bosses[i]) {
            count[bosses[i]] += count[current];
            result[bosses[i]] += result[current] + count[current];
        }
    }

    return result.slice(1);
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
    const bosses = readArray();

    const result = bureaucracy(n, bosses);
    console.log(result.join(" "));
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readString() {
    const s = _inputLines[_curLine].trim();
    _curLine++;
    return s;
}

function readArray() {
    var arr = _inputLines[_curLine]
        .trim(" ")
        .split(" ")
        .map((num) => Number(num));
    _curLine++;
    return arr;
}

module.exports = bureaucracy;
