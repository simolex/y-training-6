class Stack {
    constructor() {
        this.stack = [];
        this.prefix = [0];
    }

    push(n) {
        this.stack.push(n);
        this.prefix.push(this.prefix[this.size() - 1] + n);
        return;
    }

    pop() {
        if (this.size() > 0) {
            this.prefix.pop();
            return this.stack.pop();
        }
        return "error";
    }

    peek() {
        if (this.size() > 0) {
            return this.stack[this.size() - 1];
        }
        return "error";
    }

    sumLasts(n) {
        return this.prefix[this.size()] - this.prefix[this.size() - n];
    }

    size() {
        return this.stack.length;
    }
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
    const stack = new Stack();
    let command = "";
    let param = "";
    let line = "";
    for (let i = 0; i < n; i++) {
        line = readString().trim();
        command = line[0];
        param = line.substring(1);
        switch (command) {
            case "+":
                stack.push(Number(param));
                break;
            case "-":
                console.log(stack.pop());
                break;
            case "?":
                console.log(stack.sumLasts(Number(param)));
                break;
        }
    }
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

// module.exports = minimalValidParentheses;
