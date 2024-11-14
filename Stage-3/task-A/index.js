/**
 * Правильная скобочная последовательность
 */

function isRightSetOfBracket(s) {
    const stack = [];
    const sArr = s.split("");
    let ptrStack = 0;
    let noFail = true;
    for (let i = 0; i < s.length && noFail && ptrStack >= 0; i++) {
        switch (s[i]) {
            case "(":
            case "[":
            case "{":
                stack[ptrStack] = s[i];
                ptrStack++;
                break;
            case ")":
                if (ptrStack > 0 && stack[ptrStack - 1] !== "(") {
                    noFail = false;
                }
                ptrStack--;
                break;
            case "]":
                if (ptrStack > 0 && stack[ptrStack - 1] !== "[") {
                    noFail = false;
                }
                ptrStack--;
                break;
            case "}":
                if (ptrStack > 0 && stack[ptrStack - 1] !== "{") {
                    noFail = false;
                }
                ptrStack--;
                break;
        }
    }
    return noFail && ptrStack === 0 ? "yes" : "no";
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
    const s = readString();

    const result = isRightSetOfBracket(s);
    console.log(result);
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

module.exports = isRightSetOfBracket;
