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
function chairsBed(n, H, heights, widths) {
    const minRange = [];
    const deque = new Deque();

    for (let i = 0; i < n; i++) {
        if (i >= k && deque.peek_front() === nums[i - k]) {
            deque.pop_front();
        }

        while (deque.size() > 0 && deque.peek_back() > nums[i]) {
            deque.pop_back();
        }
        deque.push_back(nums[i]);

        if (i >= k - 1) {
            minRange.push(deque.peek_front());
        }
    }

    return minRange;
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
    const heights = readArray();
    const widths = readArray();

    const result = chairsBed(n, H, heights, widths);
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

module.exports = chairsBed;
