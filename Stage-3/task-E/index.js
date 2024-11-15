/**
 * Значение арифметического выражения
 */
class Token {
    type;
    text;
    constructor(type, text) {
        this.type = type;
        this.text = text;
    }
}
class TokenType {
    name;
    regexp;
    constructor(name, regexp) {
        this.name = name;
        this.regexp = regexp;
    }
}

const listTokenType = {
    NUMBER: new TokenType("NUMBER", "[0-9]+"),
    PLUS: new TokenType("PLUS", "\\+"),
    MINUS: new TokenType("MINUS", "\\-"),
    MULTIPLICATION: new TokenType("MULTIPLICATION", "\\*"),
    DIVISION: new TokenType("DIVISION", "\\\\"),
    OPEN_PARENTHESIS: new TokenType("OPEN_PARENTHESIS", "\\("),
    CLOSE_PARENTHESIS: new TokenType("CLOSE_PARENTHESIS", "\\)"),
    SPACE: new TokenType("SPACE", "[ \\n\\t\\r]")
};

class Lexer {
    text;
    position = 0;
    listTokens = [];
    constructor(text) {
        this.text = text;
    }
    clearSpace() {
        this.listTokens = this.listTokens.filter((token) => token.type.name !== "SPACE");
    }
    findNegativeNumber() {
        this.listTokens.unshift(new Token(listTokenType.OPEN_PARENTHESIS, "parenthesisHolder"));
        for (let i = 0; i < this.listTokens.length - 2; i++) {
            if (
                ["OPEN_PARENTHESIS", "MULTIPLICATION", "DIVISION", "PLUS", "MINUS"].includes(
                    this.listTokens[i].type.name
                ) &&
                this.listTokens[i + 1].type.name === "MINUS" &&
                this.listTokens[i + 2].type.name === "NUMBER"
            ) {
                this.listTokens[i + 1] = new Token(listTokenType.SPACE, "");
                this.listTokens[i + 2].text = `-${this.listTokens[i + 2].text}`;
            }
        }
        this.listTokens.shift();
    }

    validate() {
        for (let i = 0; i < this.listTokens.length; i++) {
            if (
                (i + 1 < this.listTokens.length &&
                    this.listTokens[i].type.name === "OPEN_PARENTHESIS" &&
                    this.listTokens[i + 1].type.name !== "NUMBER" &&
                    this.listTokens[i + 1].type.name !== "OPEN_PARENTHESIS") ||
                (i > 0 &&
                    this.listTokens[i].type.name === "CLOSE_PARENTHESIS" &&
                    this.listTokens[i - 1].type.name !== "NUMBER" &&
                    this.listTokens[i - 1].type.name !== "CLOSE_PARENTHESIS") ||
                (i < this.listTokens.length &&
                    ["MULTIPLICATION", "DIVISION", "PLUS", "MINUS"].includes(this.listTokens[i].type.name) &&
                    (i + 1 === this.listTokens.length || this.listTokens[i + 1].type.name === "CLOSE_PARENTHESIS"))
            ) {
                throw new Error("wrong parenthesis no Valid");
            }
        }
    }

    lexAnalyzer() {
        while (this.nextToken()) {}
        this.findNegativeNumber();
        this.clearSpace();
        this.validate();
        return this.listTokens;
    }

    nextToken() {
        if (this.position >= this.text.length) {
            return false;
        }

        const kindsOfTokenTypes = Object.values(listTokenType);

        for (let i = 0; i < kindsOfTokenTypes.length; i++) {
            const tokenType = kindsOfTokenTypes[i];
            const regexp = new RegExp(`^${tokenType.regexp}`);
            const result = this.text.substring(this.position).match(regexp);
            if (result && result[0]) {
                const token = new Token(tokenType, result[0]);
                this.position += result[0].length;
                this.listTokens.push(token);
                return true;
            }
        }
        throw new Error("wrong Unknown Token");
    }
}

class Parser {
    tokens;
    position = 0;
    stackOperands = [];
    postfixTokens = [];
    constructor(tokens) {
        this.tokens = tokens;
    }

    parseExpression(currentToken) {
        switch (currentToken.type.name) {
            case "PLUS":
            case "MINUS":
                while (
                    this.stackOperands.length > 0 &&
                    ["MULTIPLICATION", "DIVISION", "PLUS", "MINUS"].includes(
                        this.stackOperands[this.stackOperands.length - 1].type.name
                    )
                ) {
                    this.postfixTokens.push(this.stackOperands.pop());
                }
                this.stackOperands.push(currentToken);
                break;
            case "DIVISION":
            case "MULTIPLICATION":
                while (
                    this.stackOperands.length > 0 &&
                    ["MULTIPLICATION", "DIVISION"].includes(this.stackOperands[this.stackOperands.length - 1].type.name)
                ) {
                    this.postfixTokens.push(this.stackOperands.pop());
                }
                this.stackOperands.push(currentToken);
                break;
            case "OPEN_PARENTHESIS":
                this.stackOperands.push(currentToken);
                break;
            case "CLOSE_PARENTHESIS":
                while (
                    this.stackOperands.length > 0 &&
                    this.stackOperands[this.stackOperands.length - 1].type.name !== "OPEN_PARENTHESIS"
                ) {
                    this.postfixTokens.push(this.stackOperands.pop());
                }
                if (
                    this.stackOperands.length === 0 ||
                    this.stackOperands[this.stackOperands.length - 1].type.name !== "OPEN_PARENTHESIS"
                ) {
                    throw new Error("wrong CLOSE_PARENTHESIS");
                }
                this.stackOperands.pop();
                break;
        }
    }

    parse() {
        while (this.position < this.tokens.length) {
            const currentToken = this.tokens[this.position];
            if (currentToken.type.name === "NUMBER") {
                this.postfixTokens.push(currentToken);
            } else {
                this.parseExpression(currentToken);
            }
            this.position++;
        }
        while (this.stackOperands.length > 0) {
            const currentToken = this.stackOperands.pop();
            if (currentToken.type.name === "OPEN_PARENTHESIS") {
                throw new Error("wrong not closed parenthesis");
            }
            this.postfixTokens.push(currentToken);
        }
        return this.postfixTokens;
    }
}

class Calculator {
    tokens;
    stackNumbers = [];
    position = 0;
    constructor(tokens) {
        this.tokens = tokens;
    }

    calcExpression(currentToken) {
        if (this.stackNumbers.length < 2) {
            throw new Error("wrong Low Calc Stack");
        }

        const rightValue = this.stackNumbers.pop();
        const leftValue = this.stackNumbers.pop();

        switch (currentToken.type.name) {
            case "PLUS":
                this.stackNumbers.push(leftValue + rightValue);
                break;
            case "MINUS":
                this.stackNumbers.push(leftValue - rightValue);
                break;
            case "DIVISION":
                this.stackNumbers.push(leftValue / rightValue);
                break;
            case "MULTIPLICATION":
                this.stackNumbers.push(leftValue * rightValue);
                break;
        }
    }

    getResult() {
        while (this.position < this.tokens.length) {
            const currentToken = this.tokens[this.position];

            if (currentToken.type.name === "NUMBER") {
                this.stackNumbers.push(Number(currentToken.text));
            } else {
                this.calcExpression(currentToken);
            }
            this.position++;
        }
        if (this.stackNumbers.length !== 1) {
            throw new Error("wrong big calc stack");
        }
        return this.stackNumbers.pop();
    }
}

function calculateExpression(text) {
    let result;
    try {
        const lexer = new Lexer(text);
        const preparse = lexer.lexAnalyzer();
        const parser = new Parser(preparse);
        const parsedTokens = parser.parse();
        const calc = new Calculator(parsedTokens);
        result = calc.getResult();
    } catch (e) {
        return;
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
    const text = readString();

    const result = calculateExpression(text);

    console.log(result !== undefined ? result : "WRONG");
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

module.exports = calculateExpression;
