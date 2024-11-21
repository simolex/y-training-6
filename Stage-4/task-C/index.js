/**
 * Родословная: LCA
 */

function pedigreeLCA(n, kins, queries) {
    const nameTopParent = new Set();
    const nameAllChild = new Set();

    const parents = new Map();
    const kinMap = new Map();
    const kinRange = new Map();
    const stack = [];

    const getCommonParent = (child_1, child_2) => {
        let height_1 = kinRange.get(child_1).level;
        let height_2 = kinRange.get(child_2).level;

        while (height_1 !== height_2) {
            if (height_1 > height_2) {
                child_1 = parents.get(child_1);
                height_1--;
            } else {
                child_2 = parents.get(child_2);
                height_2--;
            }
        }
        while (child_1 !== child_2) {
            child_1 = parents.get(child_1);
            child_2 = parents.get(child_2);
        }
        return child_1;
    };

    let child, parent;
    kins.forEach((kin) => {
        [child, parent] = kin;

        parents.set(child, parent);

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

    // let times = 0;
    stack.push([nameTopParent.values().next().value, 0]);
    while (stack.length > 0) {
        const [current, level] = stack.pop();

        if (!kinRange.has(current)) {
            // times++;

            kinRange.set(current, { /*in: times,*/ level });
            stack.push([current, level]);

            if (kinMap.has(current)) {
                kinMap.get(current).forEach((next) => stack.push([next, level + 1]));
            } else {
                // kinRange.get(current)["out"] = times;
            }
        } else {
            // kinRange.get(current)["out"] = times;
        }
    }

    // console.log(kinRange);
    const result = queries.map(([c1, c2]) => getCommonParent(c1, c2));

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
