/**
 * Размер поддеревьев
 */

function sizeSubTree(n, edges) {
    const count = Array(n + 1).fill(-1);
    const parents = new Int32Array(n + 1);
    const edgeMap = new Map();
    const stack = [];

    let v1, v2;
    edges.forEach((pair) => {
        [v1, v2] = pair;
        if (!edgeMap.has(v1)) {
            edgeMap.set(v1, []);
        }
        edgeMap.get(v1).push(v2);

        if (!edgeMap.has(v2)) {
            edgeMap.set(v2, []);
        }
        edgeMap.get(v2).push(v1);
    });

    stack.push(1);
    while (stack.length > 0) {
        const current = stack.pop();
        if (count[current] < 0) {
            count[current] = 1;
            stack.push(current);

            edgeMap.get(current).forEach((next) => {
                if (count[next] < 0) {
                    stack.push(next);
                    parents[next] = current;
                }
            });
        } else {
            count[parents[current]] += count[current];
        }
    }
    return count.slice(1);
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
    const n = readInt();
    const edges = [];

    for (let i = 0; i < n - 1; i++) {
        edges.push(readArray());
    }

    const result = sizeSubTree(n, edges);
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

module.exports = sizeSubTree;
