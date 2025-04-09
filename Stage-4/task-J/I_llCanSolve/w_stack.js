const MOD = 10n ** 9n + 7n;

function main() {
    // Тестовые входные данные
    const fs = require("fs");
    const input = fs.readFileSync(0, "utf-8").trim().split("\n");
    const n = parseInt(input[0]);
    const edges = [];
    for (let i = 1; i < n; i++) {
        const [u, v] = input[i].split(" ").map(Number);
        edges.push([u, v]);
    }

    // Построение графа
    const graph = Array.from({ length: n + 1 }, () => []);
    for (const [u, v] of edges) {
        graph[u].push({ node: v, dir: 0 }); // Прямое направление
        graph[v].push({ node: u, dir: 1 }); // Обратное направление
    }

    // Предварительный расчёт комбинаторики
    const cnk = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0n));
    for (let i = 0; i <= n; i++) {
        cnk[i][0] = 1n;
        for (let j = 1; j <= i; j++) {
            cnk[i][j] = (cnk[i - 1][j - 1] + cnk[i - 1][j]) % MOD;
        }
    }

    // Итеративная версия DFS с использованием стека (исправленная)
    function iterativeDfs(startNode) {
        const stack = [];
        const dpMap = new Map();
        const childrenMap = new Map();

        // Первый проход: собираем информацию о детях
        stack.push({ node: startNode, parent: -1 });
        const visited = new Set();

        while (stack.length > 0) {
            const { node, parent } = stack.pop();
            if (visited.has(node)) continue;
            visited.add(node);

            const children = [];
            for (const { node: child, dir } of graph[node]) {
                if (child !== parent) {
                    children.push({ node: child, dir });
                    stack.push({ node: child, parent: node });
                }
            }
            childrenMap.set(node, children);
            dpMap.set(node, [1n]); // Инициализация DP
        }

        // Второй проход: пост-обработка
        const postOrder = [];
        stack.push({ node: startNode, parent: -1, processed: false });

        while (stack.length > 0) {
            const { node, parent, processed } = stack.pop();

            if (processed) {
                postOrder.push(node);
                continue;
            }

            stack.push({ node, parent, processed: true });
            const children = childrenMap.get(node) || [];

            // Добавляем детей в обратном порядке для правильной обработки
            for (let i = children.length - 1; i >= 0; i--) {
                const { node: child } = children[i];
                stack.push({ node: child, parent: node, processed: false });
            }
        }

        // Обработка в пост-порядке
        for (const node of postOrder) {
            const children = childrenMap.get(node) || [];
            let dp = dpMap.get(node);

            for (const { node: child, dir } of children) {
                const childDp = dpMap.get(child);
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
                            ways = (ways * prefixSum[cnt]) % MOD;
                        } else {
                            ways =
                                (ways *
                                    ((prefixSum[childDp.length] + MOD - prefixSum[cnt]) % MOD)) %
                                MOD;
                        }

                        newDp[x2] = (newDp[x2] + ways) % MOD;
                    }
                }
                dp = newDp;
            }
            dpMap.set(node, dp);
        }

        return dpMap.get(startNode);
    }

    const result = iterativeDfs(1);
    let total = 0n;
    for (const x of result) {
        total = (total + x) % MOD;
    }
    console.log(total.toString());
}

main();
