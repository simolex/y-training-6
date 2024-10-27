/**
 * Надпись на табло
 */

function getLetter(n, table) {
    let result;
    const leds = [];

    const weights = {
        "#": 1,
        ".": 0
    };
    const edges = []; //top, left, bottom, right

    const updateEdges = (i, j) => {
        if (edges.length === 0) {
            edges[0] = edges[2] = i;
            edges[1] = edges[3] = j;
            return;
        }

        edges[0] = Math.min(edges[0], i);
        edges[1] = Math.min(edges[1], j);
        edges[2] = Math.max(edges[2], i);
        edges[3] = Math.max(edges[3], j);
    };

    function getSum(i_1, j_1, i_2, j_2) {
        return leds[i_2][j_2] - leds[i_1 - 1][j_2] - leds[i_2][j_1 - 1] + leds[i_1 - 1][j_1 - 1];
    }

    for (let i = 0; i <= n; i++) {
        leds[i] = [];
        for (let j = 0; j <= n; j++) {
            if (i !== 0 && j !== 0) {
                const weight = weights[table[i - 1][j - 1]];
                if (weight > 0) {
                    updateEdges(i, j);
                }

                leds[i][j] = leds[i - 1][j] + leds[i][j - 1] - leds[i - 1][j - 1] + weights[table[i - 1][j - 1]];
            } else {
                leds[i][j] = 0;
            }
        }
    }

    console.log(edges);

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
