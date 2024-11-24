/**
 * Размер поддеревьев
 */

function sizeSubTree(n, edges, weights) {
    const sum = Array(n + 1).fill(-1);
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

    let nextParent, parentValue;
    stack.push(1);
    while (stack.length > 0) {
        const current = stack.pop();

        if (sum[current] < 0) {
            sum[current] = 0;
            stack.push(current);

            edgeMap.get(current).forEach((next) => {
                if (sum[next] === -1) {
                    stack.push(next);
                    parents[next] = current;
                }
            });
        } else {
            // console.log("v", current);
            prevParent = parents[current];
            sum[prevParent] += weights[current - 1];

            parentValue = prevParent > 0 ? weights[prevParent - 1] : 0;
            depth[prevParent] = Math.max(depth[prevParent], depth[current] !== 3 ? depth[current] + 1 : 3);

            if (selected[current] === 0 && depth[current] > 0) {
                console.log(
                    "if",
                    current,
                    prevParent,
                    parentValue,
                    parentValue + sum[current],
                    parentValue + weights[current - 1],
                    parentValue + sum[current] > parentValue + weights[current - 1]
                );
                if (parentValue + sum[current] > parentValue + weights[current - 1]) {
                    selected[current] = 1;
                    depth[prevParent] = 1;
                } else {
                    selected[prevParent] = 1;
                    depth[prevParent] = 0;

                    edgeMap.get(current).forEach((next) => {
                        if (next !== prevParent) {
                            selected[next] = 1;
                        }
                    });
                }
            } else if (depth[current] > 0 && depth[current] < 2 && selected[current] === 1) {
                childSum =
                    edgeMap.get(current).reduce((s, next) => (next !== prevParent ? s + sum[next] : s), 0) +
                    weights[current - 1];

                if (sum[current] < childSum) {
                    selected[current] = 0;
                    edgeMap.get(current).forEach((next) => {
                        if (next !== prevParent) {
                            selected[next] = 1;
                        }
                    });
                    edgeMap.get(current).forEach((next) => {
                        if (next !== prevParent) {
                            edgeMap.get(next).forEach((next2) => {
                                if (next2 !== next) {
                                    selected[next2] = 0;
                                }
                            });
                        }
                    });
                }

                // console.log(selected);
            }
        }
    }
    let minSum = 0;

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
