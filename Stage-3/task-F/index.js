Array.prototype.peek = function () {
    if (this.length === 0) {
        return;
    }
    return this[this.length - 1];
};

const opposites = {
    "(": ")",
    "[": "]"
};

function minimalValidParentheses(n, orderRules, pp) {
    let result = pp;
    const stack = [];
    for (let i = 0; i < pp.length; i++) {
        if (pp[i] == "(" || pp[i] == "[") {
            stack.push(pp[i]);
        } else if ((pp[i] == ")" && stack.peek() == "(") || (pp[i] == "]" && stack.peek() == "[")) {
            stack.pop();
        }
    }
    for (let i = pp.length; i < n - stack.length; i++) {
        let b = 0;
        while (orderRules[b] !== opposites[stack.peek()] && !opposites[orderRules[b]]) {
            b++;
        }
        if (orderRules[b] == "(" || orderRules[b] == "[") {
            stack.push(orderRules[b]);
        } else if ((orderRules[b] == ")" && stack.peek() == "(") || (orderRules[b] == "]" && stack.peek() == "[")) {
            stack.pop();
        }
        result += orderRules[b];
    }

    while (stack.length > 0) {
        result += opposites[stack.pop()];
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
    const orderRules = readString();
    const prefixParentheses = readString();

    const result = minimalValidParentheses(n, orderRules, prefixParentheses);

    console.log(result);
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

module.exports = minimalValidParentheses;
