/**
 * Префиксные суммы
 */

Array.prototype.peek = function () {
    if (this.length === 0) {
        return;
    }
    return this[this.length - 1];
};

function evidences(n, items, m, k, queries) {
    const prefixRepeates = new Int32Array(n + 1);
    const responses = new Int32Array(n + 1);
    const prefixBigest = new Int32Array(n + 1);
    for (let i = 1; i < n; i++) {
        prefixRepeates[i] = prefixRepeates[i - 1] + items[i - 1] === items[i] ? 1 : 0;
        prefixBigest[i] = prefixBigest[i - 1] + items[i - 1] > items[i] ? 1 : 0;
    }
    let first = 1;
    let repeats = 0;
    let bigest = false;
    responses[1] = 1;
    for (let i = 0; i < n; i++) {
        if (repeats > 0 && items[i - 1] === items[i]) {
            repeats--;
        }

        while (/*!bigest && */ first < n && repeats < k) {
            // bigest = items[first] < items[first - 1];

            if (items[first - 1] === items[first]) {
                repeats++;
            }
            responses[first + 1] = i + 1;
            console.log(i, repeats);
            first++;
        }
    }
    console.log(responses);

    return [];
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
