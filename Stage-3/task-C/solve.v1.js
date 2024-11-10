class MinMultiHeap {
    constructor(initValues) {
        this.dictionary = new Map();

        if (initValues) {
            this.values = initValues;
            this.values.forEach((v, i) => (this.dictionary[v.position] = i));
            const lastElementWithChilds = Math.floor(initValues.length / 2) - 1;
            for (let i = lastElementWithChilds; i >= 0; i--) {
                this._siftDown(i);
            }
        } else this.values = [];
    }

    add(value) {
        let index;

        if (!this.dictionary.has(value)) {
            index = this.values.length;

            this.dictionary.set(value, index);
            this.values.push({ value, count: 0 });
            this._siftUp(index);
        }

        index = this.dictionary.get(value);
        this.values[index].count++;
    }

    replace(oldValue, newValue) {
        let oldIndex;
        if (!this.dictionary.has(newValue)) {
            if (this.dictionary.has(oldValue)) {
                oldIndex = this.dictionary.get(oldValue);

                if (this.values[oldIndex].count <= 1) {
                    this.dictionary.delete(oldValue);
                    this.dictionary.set(newValue, oldIndex);
                    this.values[oldIndex] = { value: newValue, count: 1 };

                    this._siftUp(oldIndex);
                    oldIndex = this.dictionary.get(newValue);
                    this._siftDown(oldIndex);
                    return;
                }
            }
        }
        this.remove(oldValue);
        this.add(newValue);
    }

    remove(value) {
        let index;
        if (this.dictionary.has(value)) {
            index = this.dictionary.get(value);

            this.values[index].count--;
            if (this.values[index].count <= 0) {
                this.dictionary.set(Number.NEGATIVE_INFINITY, index);
                this.values[index].value = Number.NEGATIVE_INFINITY;
                this._siftUp(index);
                this.getMin();
                this.dictionary.delete(value);
                this.dictionary.delete(Number.NEGATIVE_INFINITY);
            }
        }
    }

    getMin() {
        let index = 0;
        const min = this.values[index];
        this.values[index] = this.values[this.values.length - 1];

        this._siftDown(index);
        this.values.pop();
        return min;
    }

    viewMin() {
        return this.values[0];
    }

    getValues() {
        return this.values;
    }

    isEmpty() {
        return this.values.length === 0;
    }

    _getKey(item) {
        return item.value;
    }

    _swapItems(index_1, index_2) {
        const current = this.values[index_1];
        this.values[index_1] = this.values[index_2];
        this.values[index_2] = current;

        this.dictionary.set(this.values[index_1].value, index_1);
        this.dictionary.set(this.values[index_2].value, index_2);
    }

    _siftUp(index) {
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);

            if (this._getKey(this.values[parentIndex]) > this._getKey(this.values[index])) {
                this._swapItems(index, parentIndex);
                index = parentIndex;
            } else break;
        }
    }

    _siftDown(index) {
        const length = this.values.length;
        while (index * 2 + 1 < length - 1) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;
            leftChild = this.values[leftChildIndex];
            rightChild = this.values[rightChildIndex];

            if (rightChildIndex === length) {
                swap = leftChild;
            }
            swap =
                this._getKey(rightChild) <= this._getKey(leftChild) && swap === null ? rightChildIndex : leftChildIndex;
            if (this._getKey(this.values[swap]) < this._getKey(this.values[index])) {
                this._swapItems(index, swap);
                index = swap;
            } else break;
        }
    }
}

function minimumInRange(n, k, nums) {
    const minRange = [];
    const heap = new MinMultiHeap();

    for (let i = 0; i < k; i++) {
        heap.add(nums[i]);
    }
    minRange.push(heap.viewMin().value);

    for (let i = k; i < n; i++) {
        heap.replace(nums[i - k], nums[i]);
        minRange.push(heap.viewMin().value);
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
    const params = readArray();
    const n = params[0];
    const k = params[1];
    const nums = readArray();

    const result = minimumInRange(n, k, nums);
    console.log(result.join("\n"));
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

module.exports = minimumInRange;
