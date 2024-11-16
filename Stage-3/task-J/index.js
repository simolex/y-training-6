/**
 * Кровать из стульев*
 */
class Deque {
    deque = [];
    constructor() {
        this.clear();
    }

    _getPtr(ptr) {
        return (this.limit + ((ptr % this.limit) % this.limit)) % this.limit;
    }
    _checkSizeDeque() {
        if (this.size() >= this.limit) {
            let pos = 0;
            const newDeque = this.deque;
            this.deque = [];
            for (let i = this.ptrBack; i < this.ptrFront; i++) {
                this.deque[pos++] = newDeque[this._getPtr(i)];
            }
            this.ptrBack = 0;
            this.ptrFront = pos;
            this.limit *= 2;
        }
    }

    push_front(n) {
        this._checkSizeDeque();
        this.deque[this._getPtr(this.ptrFront++)] = n;
    }

    push_back(n) {
        this._checkSizeDeque();
        this.deque[this._getPtr(--this.ptrBack)] = n;
    }

    pop_front() {
        if (this.size() > 0) {
            return this.deque[this._getPtr(--this.ptrFront)];
        }
        return null;
    }

    pop_back() {
        if (this.size() > 0) {
            return this.deque[this._getPtr(this.ptrBack++)];
        }
        return null;
    }

    peek_front() {
        if (this.size() > 0) {
            return this.deque[this._getPtr(this.ptrFront - 1)];
        }
        return null;
    }

    peek_back() {
        if (this.size() > 0) {
            return this.deque[this._getPtr(this.ptrBack)];
        }
        return "error";
    }

    size() {
        return this.ptrFront - this.ptrBack;
    }

    clear() {
        this.deque.length = 0;
        this.ptrBack = 0;
        this.ptrFront = 0;
        this.limit = 2;
    }
}
function chairsBed(n, H, heightAndWidth) {
    const needWidth = H;
    let minDelta = Infinity;
    let currentWidth = 0;
    const deque = new Deque();

    heightAndWidth.sort((a, b) => a[0] - b[0]);

    let j = 0;
    let prevChair = 0;
    let delta;
    for (let i = 0; i < n; i++) {
        if (heightAndWidth[i][1] >= needWidth) {
            return 0;
        }
        while (j < n && currentWidth < needWidth) {
            if (j > prevChair) {
                prevChair++;
                delta = heightAndWidth[j][0] - heightAndWidth[j - 1][0];

                while (deque.size() > 0 && deque.peek_back() < delta) {
                    deque.pop_back();
                }
                deque.push_back(delta);
            }
            currentWidth += heightAndWidth[j][1];
            j++;
        }

        if (currentWidth >= needWidth) {
            minDelta = Math.min(minDelta, deque.peek_front());
        }

        currentWidth -= heightAndWidth[i][1];
        if (i < n - 1 && deque.size() > 0 && deque.peek_front() === heightAndWidth[i + 1][0] - heightAndWidth[i][0]) {
            deque.pop_front();
        }
    }

    return minDelta;
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
    const [n, H] = readArray();
    const heightAndWidth = readArray2D();
    readArray().forEach((v, i) => heightAndWidth[i].push(v));

    const result = chairsBed(n, H, heightAndWidth);
    console.log(result);
}

function readAllString() {
    var arr = _inputLines.map((line) => line.trim());

    return arr;
}

function readString() {
    var str = _inputLines[_curLine].trim(" ");
    _curLine++;
    return str;
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
        .filter((str) => str && str.length > 0)
        .map((num) => Number(num));
    _curLine++;
    return arr;
}

function readArray2D() {
    var arr = _inputLines[_curLine]
        .trim(" ")
        .split(" ")
        .filter((str) => str && str.length > 0)
        .map((num) => [Number(num)]);
    _curLine++;
    return arr;
}

module.exports = chairsBed;
