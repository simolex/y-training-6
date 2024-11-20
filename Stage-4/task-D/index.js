/**
 * Бинарное дерево (вставка, поиск, обход)*
 */

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor() {
        this.root = null;
    }

    add(value) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return "DONE";
        }
        let node = this.root;
        while (node) {
            if (node.value === value) {
                return "ALREADY";
            }
            if (value < node.value) {
                if (node.left === null) {
                    node.left = newNode;
                    return "DONE";
                }
                node = node.left;
            } else {
                if (node.right === null) {
                    node.right = newNode;
                    return "DONE";
                }
                node = node.right;
            }
        }
    }

    search(value) {
        if (this.root === null) {
            return "NO";
        }

        let node = this.root;
        while (node) {
            if (node.value === value) {
                return "YES";
            }
            if (value < node.value) {
                if (node.left === null) {
                    return "NO";
                }
                node = node.left;
            } else {
                if (node.right === null) {
                    return "NO";
                }
                node = node.right;
            }
        }
    }

    print(current = this.root, level = 0, result = []) {
        if (current !== null) {
            this.print(current.left, level + 1, result);
            result.push(`${".".repeat(level)}${current.value}`);
            this.print(current.right, level + 1, result);
        }

        if (level === 0) {
            return result;
        }
    }
}

function binaryTree(commands) {
    let tree = new Tree();
    const result = [];

    commands.forEach((com) => {
        const [token, param] = com.split(" ");

        switch (token) {
            case "ADD":
                result.push([tree.add(+param)]);
                break;
            case "SEARCH":
                result.push([tree.search(+param)]);
                break;
            case "PRINTTREE":
                result.push(tree.print());
                break;
        }
    });

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
    const commands = [];

    while (_curLine < _inputLines.length) {
        commands.push(readString());
    }

    const result = binaryTree(commands);
    console.log(
        result
            .map((ans) => ans.join("\n"))
            .filter((s) => s.length > 0)
            .join("\n")
    );
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

module.exports = binaryTree;
