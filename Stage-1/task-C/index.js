/**
 * Надпись на табло
 */

function getLetter(n, table) {
    let result;
    const leds = [];

    const weights = {
        "#": 1,
        ".": 0,
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

    const getSum = (I1, J1, I2, J2) => {
        return leds[I2][J2] - leds[I1 - 1][J2] - leds[I2][J1 - 1] + leds[I1 - 1][J1 - 1];
    };

    const getNextDotFrom = (atI, atJ) => {
        let isDots = false;
        let [top, left, bottomMax, rightMax] = edges;
        let bottom, right;

        for (let i = atI; i <= bottomMax; ++i) {
            for (let j = atJ; j <= rightMax; ++j) {
                if (!isDots && weights[table[i - 1][j - 1]] === 0) {
                    isDots = true;
                    top = i;
                    left = j;
                }

                if (isDots && getSum(top, left, i, j) === 0) {
                    bottom = i;
                    right = j;
                }
            }
        }

        return !isDots ? [top, left, bottom, right] : [];
    };

    for (let i = 0; i <= n; i++) {
        leds[i] = [];
        for (let j = 0; j <= n; j++) {
            if (i !== 0 && j !== 0) {
                const weight = weights[table[i - 1][j - 1]];
                if (weight > 0) {
                    updateEdges(i, j);
                }

                leds[i][j] =
                    leds[i - 1][j] +
                    leds[i][j - 1] -
                    leds[i - 1][j - 1] +
                    weights[table[i - 1][j - 1]];
            } else {
                leds[i][j] = 0;
            }
        }
    }

    if (edges.length == 0) return "X";

    let [tRect, lRect, bRect, rRect] = edges;

    const getSize = (top, left, bottom, right) => (bottom + 1 - top) * (right + 1 - left);
    const ledLights = getSum(...edges);
    const letterSize = getSize(...edges);

    if (ledLights === letterSize) {
        return "I";
    } else {
        const dotFirst = getNextDotFrom(tRect, lRect);
        let dotSecond = [];
        const bFirst = dotFirst[2];

        if (bFirst + 2 <= bRect) {
            dotSecond = getNextDotFrom(bFirst + 2, lRect);
        }

        if (dotFirst.length > 0 && dotSecond.length == 0) {
            const [top, left, bottom, right] = dotFirst;
            const dotSize = getSize(top, left, bottom, right);

            if (left > lRect && ledLights + dotSize === letterSize) {
                if (right == rRect) {
                    if (top == tRect) {
                        return "L";
                    } else if (bottom < bRect) {
                        return "C";
                    } else {
                        return "X";
                    }
                } else if (top > tRect && bottom < bRect) {
                    return "O";
                } else {
                    return "X";
                }
            } else {
                return "X";
            }
        }
    }

    console.log();

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
