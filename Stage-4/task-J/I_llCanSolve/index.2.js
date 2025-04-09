/**
 * Количество топсортов дерева*
 */
function modInverse(a, mod) {
    a = ((a % mod) + mod) % mod;
    let b = mod,
        x = 0,
        y = 1;
    while (a > 1) {
        const q = Math.floor(a / b);
        [a, b] = [b, a % b];
        [x, y] = [y - q * x, x];
    }
    return y < 0 ? y + mod : y;
}

function countTopSorts(n, edges) {
    let m = edges.length;
    const MOD = 10 ** 9 + 7;
    const inDegree = new Array(n + 1).fill(0);
    const adj = Array.from({ length: n + 1 }, () => []);

    const fact = new Array(n + 1).fill(1);
    for (let i = 1; i <= n; i++) {
        fact[i] = (fact[i - 1] * i) % MOD;
    }

    for (let i = 0; i < m; i++) {
        const [a, b] = edges[i];
        adj[a].push(b);
        inDegree[b]++;
    }
    console.log(inDegree);
    // Находим корень (вершину с inDegree 0)
    let root = -1;
    for (let u = 1; u <= n; u++) {
        if (inDegree[u] === 0) {
            root = u;
            break;
        }
    }
    console.log(root);

    // Предварительно вычисляем comb(n, k) mod MOD для n до 3000

    const size = new Array(n + 1).fill(1);
    const dp = new Array(n + 1).fill(1);

    function dfs(u) {
        for (const v of adj[u]) {
            dfs(v);
            // Комбинируем поддеревья: dp[u] *= dp[v] * C(size[u] + size[v] - 1, size[v])
            dp[u] = (dp[u] * dp[v]) % MOD;
            dp[u] = (dp[u] * fact[size[u] + size[v] - 1]) % MOD;
            dp[u] = (dp[u] * modInverse(fact[size[u] - 1], MOD)) % MOD;
            dp[u] = (dp[u] * modInverse(fact[size[v]], MOD)) % MOD;
            size[u] += size[v];
        }
    }
    dfs(root);
    console.log(size);
    console.log(dp);

    return dp[root];
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
    const edges = [];

    while (_curLine < _inputLines.length) {
        edges.push(readArray());
    }

    const result = countTopSorts(n, edges);

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

module.exports = countTopSorts;
