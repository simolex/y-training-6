/**
 * Автоматизированный склад*
 */

class Queue {
    constructor() {
        this.queue = [];
        this.frontPtr = 0;
    }

    push_back(n) {
        this.queue.push(n);
    }

    pop_front() {
        if (this.size() > 0) {
            return this.queue[this.frontPtr++];
        }
    }

    peek_front() {
        if (this.size() > 0) {
            return this.queue[this.frontPtr];
        }
    }

    size() {
        return this.queue.length - this.frontPtr;
    }
}

const getMainRoads = (a, b) => {
    const decode = { 2: "R_1_2", 6: "R_2_3", 12: "R_3_4", 4: "R_1_4", 3: "R_1_3", 8: "R_2_4" };
    return decode[a * b];
};

const orderRules = {
    R_1_2: [[1], [2], [3], [4]],
    R_2_3: [[2], [3], [4], [1]],
    R_3_4: [[3], [4], [1], [2]],
    R_1_4: [[4], [1], [2], [3]],
    R_1_3: [
        [1, 3],
        [2, 4]
    ],
    R_2_4: [
        [2, 4],
        [1, 3]
    ]
};

function automatedStore(n, a, b, rovers) {
    const result = Array(n);

    const mainCode = getMainRoads(a, b);
    const rules = orderRules[mainCode];
    const roads = {
        1: new Queue(),
        2: new Queue(),
        3: new Queue(),
        4: new Queue()
    };
    const indexRoad = Object.keys(roads);

    rovers.forEach((v, i) => v.push(i));
    rovers.sort((a, b) => a[1] - b[1]);
    rovers.forEach((r) => roads[r[0]].push_back(r));

    let time = 1;
    let isBusy = false;
    let curRover;
    while (indexRoad.reduce((sum, idxQ) => sum + roads[idxQ].size(), 0) > 0) {
        for (let rule = 0; rule < rules.length && !isBusy; rule++) {
            for (let i = 0; i < rules[rule].length; i++) {
                if ((curRover = roads[rules[rule][i]].peek_front()) && curRover[1] <= time) {
                    isBusy = true;
                    roads[rules[rule][i]].pop_front();
                    result[curRover[2]] = time;
                }
            }
        }
        isBusy = false;
        time++;
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
    const n = readInt();
    const [a, b] = readArray();

    const rovers = [];
    for (let i = 0; i < n; i++) {
        rovers.push(readArray());
    }

    const result = automatedStore(n, a, b, rovers);

    console.log(result.join("\n"));
}

function readAllString() {
    var arr = _inputLines.map((line) => line.trim());

    return arr;
}

function readString() {
    var str = _inputLines[_curLine] || "";
    _curLine++;
    return str.trim(" ");
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}
function readBigInt() {
    const n = BigInt(_inputLines[_curLine]);
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

function readBigIntArray() {
    var arr = _inputLines[_curLine]
        .trim(" ")
        .split(" ")
        .map((num) => BigInt(num));
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

function readEdges(n) {
    let grid = [];
    for (let i = 0; i < n; i++) {
        let vertex = readArray();
        grid.push(vertex);
    }
    return grid;
}

module.exports = automatedStore;
