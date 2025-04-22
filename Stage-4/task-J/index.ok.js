const MOD = 10n ** 9n + 7n;
const smMOD = 10 ** 9 + 7;

function main() {
    // Тестовые входные данные
    const fs = require("fs");
    const input = fs.readFileSync(0, "utf-8").trim().split("\n");
    const n = parseInt(input[0]);

    const graph = Array.from({ length: n + 1 }, () => []);
    for (let i = 1; i < n; i++) {
        const [u, v] = input[i].split(" ").map(Number);
        graph[u].push({ node: v, dir: 0 }); // Прямое направление
        graph[v].push({ node: u, dir: 1 }); // Обратное направление
    }

    const cnk = Array.from({ length: n + 1 }, (_, i) => new Int32Array(i + 2).fill(0));
    for (let i = 0; i <= n; i++) {
        cnk[i][0] = 1;
        for (let j = 1; j <= i; j++) {
            cnk[i][j] = (cnk[i - 1][j - 1] + cnk[i - 1][j]) % smMOD;
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

            // Добавляем детей в обратном порядке для правильной обработки
            stack.push(
                ...(childrenMap.get(node) || [])
                    .map(({ node: child }) => ({
                        node: child,
                        parent: node,
                        processed: false,
                    }))
                    .reverse()
            );
        }

        // Обработка в пост-порядке

        // let newDp;
        const buffer = Array(2);
        const lengthBuffer = Array(2);
        buffer[0] = [];
        buffer[1] = new Array(1).fill(0n);
        lengthBuffer[0] = 0;
        lengthBuffer[1] = 1;

        let prefixSum = [0n];

        for (const node of postOrder) {
            const children = childrenMap.get(node) || [];
            let idxDp = 0;
            let idxNewDp = 1;
            // let dp
            buffer[idxDp] = dpMap.get(node);
            lengthBuffer[idxDp] = buffer[idxDp].length;

            for (const { node: child, dir } of children) {
                const childDp = dpMap.get(child);
                if (childDp.length - 1 > prefixSum.length) {
                    prefixSum = Array(prefixSum.length + childDp.length + 1);
                }
                prefixSum[0] = 0n;
                let index = 1;
                for (const x of childDp) {
                    prefixSum[index] = (prefixSum[index - 1] + x) % MOD;
                    index++;
                }

                const newDpLength = lengthBuffer[idxDp] + childDp.length;
                if (buffer[idxNewDp].length < newDpLength)
                    buffer[idxNewDp] = new Array(newDpLength).fill(0n);
                lengthBuffer[idxNewDp] = newDpLength;

                buffer[idxNewDp].fill(0n);

                for (let x1 = 0; x1 < lengthBuffer[idxDp]; x1++) {
                    for (let cnt = 0; cnt <= childDp.length; cnt++) {
                        const x2 = x1 + cnt;

                        let ways =
                            (BigInt(cnk[x2][cnt]) *
                                BigInt(
                                    cnk[lengthBuffer[idxNewDp] - 1 - x2][childDp.length - cnt]
                                )) %
                            MOD;
                        ways = (ways * buffer[idxDp][x1]) % MOD;

                        if (dir === 0) {
                            ways = (ways * prefixSum[cnt]) % MOD;
                        } else {
                            ways =
                                (ways *
                                    ((prefixSum[childDp.length] + MOD - prefixSum[cnt]) % MOD)) %
                                MOD;
                        }

                        buffer[idxNewDp][x2] = (buffer[idxNewDp][x2] + ways) % MOD;
                    }
                }
                // dp = newDp.slice(0, newDpLength);
                idxDp = 1 - idxDp;
                idxNewDp = 1 - idxNewDp;
            }
            dpMap.set(node, buffer[idxDp].slice(0, lengthBuffer[idxDp]));
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
