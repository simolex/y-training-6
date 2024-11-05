/**
 * Исследование улик*
 */

function evidences(n, items, m, k, queries) {
    const responses = new Int32Array(n + 1);
    const prefixRepeates = new Int32Array(n + 1);
    const prefixBigest = new Int32Array(n + 1);
    for (let i = 0; i < n - 1; i++) {
        prefixRepeates[i + 1] = prefixRepeates[i] + (items[i] === items[i + 1] ? 1 : 0);
        prefixBigest[i + 1] = prefixBigest[i] + (items[i] > items[i + 1] ? 1 : 0);
    }

    let first = 1;
    responses[1] = 1;
    for (let i = 0; i <= n; i++) {
        while (
            first < n &&
            (prefixRepeates[first] - prefixRepeates[i] < k ||
                (prefixRepeates[first] - prefixRepeates[i] === k && prefixBigest[first] - prefixBigest[i] === 0))
        ) {
            if (prefixBigest[first] - prefixBigest[i] === 0) {
                responses[first + 1] = i + 1;
            } else {
                responses[first + 1] = first + 1;
                i = first;
            }
            first++;
        }
    }

    return queries.map((queryIdx) => responses[queryIdx]);
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
    const items = readArray();
    const [m, k] = readArray();
    const queries = readArray();

    const result = evidences(n, items, m, k, queries);
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

module.exports = evidences;
