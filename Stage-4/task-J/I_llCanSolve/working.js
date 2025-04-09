const MOD = 10n ** 9n + 7n;

// Необходимо избавиться от рекурсии!!!!!

function main() {
    // Чтение ввода (пример для Node.js)
    const fs = require("fs");
    const input = fs.readFileSync(0, "utf-8").trim().split("\n");
    const n = parseInt(input[0]);
    const edges = [];
    for (let i = 1; i < n; i++) {
        const [u, v] = input[i].split(" ").map(Number);
        edges.push([u, v]);
    }

    // Построение графа с учётом направлений
    const graph = Array.from({ length: n + 1 }, () => []);
    for (const [u, v] of edges) {
        graph[u].push({ node: v, dir: 0 }); // Прямое направление
        graph[v].push({ node: u, dir: 1 }); // Обратное направление
    }

    // Предварительный расчёт комбинаторики C(n, k)
    const cnk = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0n));
    for (let i = 0; i <= n; i++) {
        cnk[i][0] = 1n;
        for (let j = 1; j <= i; j++) {
            cnk[i][j] = (cnk[i - 1][j - 1] + cnk[i - 1][j]) % MOD;
        }
    }

    // Рекурсивная функция для подсчёта топологических сортировок
    function dfs(u, parent) {
        let dp = [1n]; // Базовый случай: одна вершина - одна перестановка

        for (const { node: v, dir } of graph[u]) {
            if (v === parent) continue;

            const childDp = dfs(v, u);
            const prefixSum = [0n];
            for (const x of childDp) {
                prefixSum.push((prefixSum[prefixSum.length - 1] + x) % MOD);
            }

            const newDp = Array(dp.length + childDp.length).fill(0n);
            for (let x1 = 0; x1 < dp.length; x1++) {
                for (let cnt = 0; cnt <= childDp.length; cnt++) {
                    const x2 = x1 + cnt;
                    let ways =
                        (cnk[x2][cnt] * cnk[newDp.length - 1 - x2][childDp.length - cnt]) % MOD;
                    ways = (ways * dp[x1]) % MOD;

                    if (dir === 0) {
                        // Прямое направление u->v
                        ways = (ways * prefixSum[cnt]) % MOD;
                    } else {
                        // Обратное направление v->u
                        ways =
                            (ways * ((prefixSum[childDp.length] + MOD - prefixSum[cnt]) % MOD)) %
                            MOD;
                    }

                    newDp[x2] = (newDp[x2] + ways) % MOD;
                }
            }
            dp = newDp;
        }
        return dp;
    }

    const result = dfs(1, -1);
    let total = 0n;
    for (const x of result) {
        total = (total + x) % MOD;
    }
    console.log(total.toString());
}

main();
