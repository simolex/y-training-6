/**
 * Размер поддеревьев
 */

function sizeSubTree(n, edges, weights) {
    const sum = Array(n + 1)
        .fill()
        .map(() => Array(2).fill(-1).fill(0, 1));

    const selected = new Int8Array(n + 1);
    const depth = new Int8Array(n + 1);
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

    let parent;
    stack.push(1);
    while (stack.length > 0) {
        const current = stack.pop();

        if (sum[current][0] < 0) {
            sum[current][0] = 0;
            stack.push(current);

            edgeMap.get(current).forEach((next) => {
                if (sum[next][0] === -1) {
                    stack.push(next);
                    parents[next] = current;
                }
            });
        } else {
            parent = parents[current];

            sum[current][1] += weights[current - 1];

            if (current > 1) {
                for (let i = 0; i < 2; i++) {
                    if (i == 1) {
                        if (sum[current][0] > sum[current][1]) {
                            selected[current] = 1;
                            sum[parent][1] += sum[current][1];
                        } else {
                            sum[parent][1] += sum[current][0];
                        }
                    } else {
                        sum[parent][0] += sum[current][1];
                    }
                }
            }
        }
    }
    let minSum = Math.min(sum[1][1], sum[1][0]);

    stack.push([1, minSum]);
    while (stack.length > 0) {
        let [current, min] = stack.pop();

        if (sum[current][1] == min) {
            min -= weights[current - 1];
            selected[current] = 1;
            edgeMap.get(current).forEach((next) => {
                if (current === parents[next]) {
                    stack.push([next, sum[next][selected[next]]]);
                }
            });
        } else {
            edgeMap.get(current).forEach((next) => {
                if (current === parents[next]) {
                    stack.push([next, sum[next][1]]);
                }
            });
        }
    }

    minSum = 0;
    const result = weights
        .map((w, idx) => {
            if (selected[idx + 1] > 0) minSum += weights[idx];
            return selected[idx + 1] ? idx + 1 : 0;
        })
        .filter((idx) => {
            return idx > 0;
        });

    result.push(minSum);

    return result;
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

    if (n > 1) {
        for (let i = 0; i < n - 1; i++) {
            edges.push(readArray());
        }
        const weights = readArray();

        const result = sizeSubTree(n, edges, weights);

        const minSum = result.pop();
        console.log(`${minSum} ${result.length}`);
        console.log(result.join(" "));
    } else {
        const weights = readArray();
        console.log(`${weights[0]} ${1}`);
        console.log(1);
    }
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
