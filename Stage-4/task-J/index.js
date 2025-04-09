/**
 * Количество топсортов дерева*
 */

function countTopSorts(n, edges) {
    const MOD = 10 ** 9 + 7;

    // Build the adjacency list
    const g = Array.from({ length: n + 1 }, () => []);
    for (const [u, v, dir] of edges) {
        g[u].push([v, dir]);
        g[v].push([u, 1 - dir]);
    }

    // Precompute combinations C(n, k)
    const cnk = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= n; i++) {
        cnk[i][0] = 1;
        for (let j = 1; j <= i; j++) {
            cnk[i][j] = (cnk[i - 1][j - 1] + cnk[i - 1][j]) % MOD;
        }
    }

    // Iterative DFS using a stack
    const stack = [];
    const parent = new Array(n + 1).fill(-1);
    const visited = new Array(n + 1).fill(false);
    const postStack = [];

    // Initial push
    stack.push(1);
    visited[1] = true;

    // DFS to build post-order traversal
    while (stack.length > 0) {
        const u = stack.pop();
        postStack.push(u);

        for (const [v, dir] of g[u]) {
            if (!visited[v] && v !== parent[u]) {
                parent[v] = u;
                visited[v] = true;
                stack.push(v);
            }
        }
    }

    // Process nodes in post-order
    const dp = new Array(n + 1);
    for (let i = 1; i <= n; i++) {
        dp[i] = { d: [1], children: [] };
    }

    // We need to process children in reverse order of the postStack
    for (let i = postStack.length - 1; i >= 0; i--) {
        const u = postStack[i];
        const current = dp[u];

        for (const [v, dir] of g[u]) {
            if (v !== parent[u]) {
                current.children.push({ node: v, dir });
            }
        }
    }

    // Now process each node after its children
    for (const u of postStack) {
        const current = dp[u];
        if (current.children.length === 0) {
            continue; // leaf node, keep d = [1]
        }

        for (const child of current.children) {
            const v = child.node;
            const dir = child.dir;
            const childDp = dp[v].d;

            const nd = childDp;
            const nds = [0];
            for (const x of nd) {
                nds.push((nds[nds.length - 1] + x) % MOD);
            }

            const newD = new Array(current.d.length + nd.length).fill(0);

            for (let x1 = 0; x1 < current.d.length; x1++) {
                for (let cnt1 = 0; cnt1 <= nd.length; cnt1++) {
                    const x2 = x1 + cnt1;
                    let val = (cnk[x2][cnt1] * cnk[newD.length - 1 - x2][nd.length - cnt1]) % MOD;
                    val = (val * current.d[x1]) % MOD;

                    if (dir === 1) {
                        val = (val * nds[cnt1]) % MOD;
                    } else {
                        val = (val * ((nds[nds.length - 1] - nds[cnt1] + MOD) % MOD)) % MOD;
                    }

                    newD[x2] = (newD[x2] + val) % MOD;
                }
            }

            current.d = newD;
        }
    }

    const rootDp = dp[1].d;
    let sum = 0;
    for (const x of rootDp) {
        sum = (sum + x) % MOD;
    }
    return sum;
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
