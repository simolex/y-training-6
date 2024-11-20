/**
 * Родословная: LCA
 */

function pedigreeLCA(n, kins, queries) {
    const nameTopParent = new Set();
    const nameAllChild = new Set();
    const kinMap = new Map();
    const kinRange = new Map();
    const stack = [];

    const count = Array(n + 1).fill(-1);
    const parents = new Int32Array(n + 1);

    let child, parent;
    kins.forEach((kin) => {
        [child, parent] = kin;

        if (!kinMap.has(parent)) {
            kinMap.set(parent, []);
        }
        kinMap.get(parent).push(child);

        nameTopParent.add(parent);
        nameAllChild.add(child);
    });

    for (const child of nameAllChild.values()) {
        nameTopParent.delete(child);
    }
    nameAllChild.clear();

    // console.log(kinMap, nameTopParent);

    let times = 0;
    stack.push(nameTopParent.values().next().value);
    console.log(kinMap);
    while (stack.length > 0) {
        const current = stack.pop();

        if (!kinRange.has(current)) {
            times++;

            kinRange.set(current, { in: times });
            stack.push(current);

            if (kinMap.has(current)) {
                kinMap.get(current).forEach((next) => stack.push(next));
            } else {
                kinRange.get(current)["out"] = times;
            }
        } else {
            kinRange.get(current)["out"] = times;
        }
    }

    console.log(kinRange);

    // stack[pntStack++] = 1;
    // while (pntStack > 0) {
    //     const current = stack[--pntStack];
    //     if (vizited[current] > 0) {
    //         vizited[current] = 2;
    //         if (current - 2 >= 0 && bosses[current - 2]) {
    //             count[bosses[current - 2]] += count[current];
    //             result[bosses[current - 2]] += result[current] + count[current];
    //         }
    //     } else {
    //         vizited[current] = 1;

    //         if (bossMap.has(current)) {
    //             stack[pntStack++] = current;
    //             // stack.push(current);
    //             // bossMap.get(current).sort((a, b) => b - a);
    //             bossMap.get(current).forEach((v) => (stack[pntStack++] = v));
    //             // stack.push(...bossMap.get(current));
    //         } else {
    //             count[bosses[current - 2]] += 1;
    //             result[bosses[current - 2]] += 2;
    //         }
    //     }
    // }
    return count;
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
    const kins = [];
    const queries = [];

    for (let i = 0; i < n - 1; i++) {
        kins.push(readStringArray());
    }

    while (_curLine < _inputLines.length) {
        queries.push(readStringArray());
    }

    // console.log(kins, queries);

    const result = pedigreeLCA(n, kins, queries);
    console.log(result.join("\n"));
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

function readStringArray() {
    var arr = _inputLines[_curLine]
        .trim(" ")
        .split(" ")
        .filter((str) => str && str.length > 0);
    _curLine++;
    return arr;
}

module.exports = pedigreeLCA;
