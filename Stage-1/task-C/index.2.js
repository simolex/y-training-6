/**
 * Надпись на табло
 */

function getLetter(n, table) {
    const iSplit = new Set();
    const jSplit = new Set();

    const delta = [
        { x: 0, y: -1, toTop: true },
        { x: -1, y: 0, toTop: false },
    ];

    const getSize = ({ top, left, bottom, right }) => (bottom + 1 - top) * (right + 1 - left);

    const field = [Array(n + 2).fill("+")].concat(
        table.map((row) => ["+"].concat(row, ["+"])),
        [Array(n + 2).fill("+")]
    );

    const edges = field.reduce(
        (rect, row, i) =>
            row.reduce((rect, v, j) => {
                if (v === "#") {
                    rect.top = Math.min(rect.top, i);
                    rect.left = Math.min(rect.left, j);
                    rect.bottom = Math.max(rect.bottom, i);
                    rect.right = Math.max(rect.right, j);
                }
                return rect;
            }, rect),
        { top: Infinity, left: Infinity, bottom: -Infinity, right: -Infinity }
    );

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
            if (!(i >= edges.top && i <= edges.bottom && j >= edges.left && j <= edges.right)) {
                field[i][j] = "+";
            }
        }
    }

    for (let i = edges.top; i <= edges.bottom; i++) {
        for (let j = edges.left; j <= edges.right; j++) {
            const currChar = field[i][j];
            delta.forEach(({ x, y, toTop }) => {
                const char = field[i + x][j + y];
                if (currChar !== char) {
                    if (toTop) {
                        jSplit.add(j);
                    } else {
                        iSplit.add(i);
                    }
                }
            });
        }
    }

    if (iSplit.size <= 4 && jSplit.size <= 3 && getSize(edges) > 0) {
        const iSize = iSplit.size;
        const jSize = jSplit.size;
        const hashLength = iSize * jSize;

        if (hashLength == 1) {
            return "I";
        }

        let mask = 0;
        const iRect = [...iSplit.values()].sort((a, b) => a - b);
        const jRect = [...jSplit.values()].sort((a, b) => a - b);
        for (let i = 0; i < hashLength; ++i) {
            if (field[iRect[Math.floor(i / jSize)]][jRect[i % jSize]] === "#") {
                mask = mask + 2 ** i;
            }
        }
        if (iSize == 2 && jSize == 2 && mask == 13) return "L";
        if (iSize == 3 && jSize == 2 && mask == 55) return "C";
        if (iSize == 3 && jSize == 3) {
            if (mask == 381) return "H";
            if (mask == 495) return "O";
        }
        if (iSize == 4 && jSize == 3 && mask == 1007) return "P";
    }
    return "X";
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

    const table = [];
    for (let i = 0; i < n; i++) {
        table.push(
            readString()
                .split("")
                .filter((s) => s.length > 0)
        );
    }

    const result = getLetter(n, table);

    console.log(result);
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

module.exports = getLetter;
