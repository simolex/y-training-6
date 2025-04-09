import sys
sys.setrecursionlimit(2000001)

MOD = 10**9 + 7


def count_topsorts(num, parent):
    d1 = [1]
    for child in g[num]:
        if child[0] == parent:
            continue;
    nd = count_topsorts(child[0], num)
    nds = [0]
    for x in nd:
        nds.append((nds[-1] + x) % MOD)
    d2 = [0] * (len(d1) + len(nd))
    for x1 in range(len(d1)):
        for cnt1 in range(len(nd) + 1):
            x2 = x1 + cnt1
            val = cnk[x2][cnt1] * cnk[len(d2) - 1 - x2][len(nd) - cnt1] * d1[x1] % MOD
            if child[1] == 1:
                val = val * nds[cnt1] % MOD
            else:
                val = val * (nds[-1] - nds[cnt1]) % MOD
            d1[x2] = d2[x2] + val % MOD
        d1, d2 = d2, d1
    return d1

n = int(input())
g = []    
for i in range(n + 1):
    g.append([])
for i in range(n - 1):
    u, v = map(int, input().split())
    g[u].append((v, 0))
    g[v].append((u, 1))

cnk = [[1] + [0] * n]
for i in range(1, (n+1)):
    cnk.append([0] * (n+1))
    cnk[i][0] = 1 
    for j in range(1, i+1):
        cnk[i][j] = (cnk[i-1][j-1] + cnk[i-1][j]) % MOD
ans = count_topsorts(1,-1)
print(sum(ans) % MOD)
