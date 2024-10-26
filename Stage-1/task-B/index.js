/**
 * Майки и носки
 */

function blueOrRed(shirtAndSockCounts) {
    let result;
    const [blueShirt, redShirt, blueSock, redSock] = shirtAndSockCounts;
    if ((blueShirt === 0 && blueSock === 0) || (redShirt === 0 && redSock === 0)) {
        return [1, 1];
    }

    if (blueShirt > 0 && blueSock === 0) {
        return [blueShirt + 1, 1];
    }

    if (redShirt > 0 && redSock === 0) {
        return [redShirt + 1, 1];
    }

    if (blueShirt === 0 && blueSock > 0) {
        return [1, blueSock + 1];
    }
    if (redShirt === 0 && redSock > 0) {
        return [1, redSock + 1];
    }

    if (Math.max(blueShirt, redShirt) > Math.max(blueSock, redSock)) {
        result = [1, Math.max(blueSock, redSock) + 1];
    } else {
        result = [Math.max(blueShirt, redShirt) + 1, 1];
    }
    if (blueShirt + blueSock > redShirt + redSock && redShirt + redSock + 2 < result[0] + result[1]) {
        result = [redShirt + 1, redSock + 1];
    }
    if (blueShirt + blueSock < redShirt + redSock && blueShirt + blueSock + 2 < result[0] + result[1]) {
        result = [blueShirt + 1, blueSock + 1];
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
    const shirtAndSockCounts = [];
    for (let i = 0; i < 4; i++) {
        shirtAndSockCounts.push(readInt());
    }

    const result = blueOrRed(shirtAndSockCounts);

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

module.exports = blueOrRed;
