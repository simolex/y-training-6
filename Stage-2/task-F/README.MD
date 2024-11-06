# Плот

[<kbd>algorithm</kbd>](https://contest.yandex.ru/contest/66793/problems/F/)

Задана последовательность из $n$ чисел $a_i$. Найдите число $\displaystyle \sum_{1 \leq i < j < k \leq n} a_i \times a_j \times a_k$
​

Поскольку число может получиться слишком большим, требуется посчитать его по модулю $1\,000\,000\,007$.

<details>
<summary>Форматы ввода/вывода и примеры</summary>

## Формат ввода

В первой строке дано одно целое число $n$ $(3 \leq n \leq 10^6 )$.

Во второй строке даны $n$ целых чисел $a_i$​ $(0 \leq a_i \leq 10^6 )$.

## Формат вывода

Выведите требуемое число по модулю $1\,000\,000\,007$.

### Пример 1

<table width = "100%">
<tr>
<th>Ввод</th> <th>Вывод</th>
</tr>
<tr valign="top">
<td><pre>
<code>5
10 -4 5 0 2
</code></pre></td>

<td><pre>
<code>10 6 11 11 13 
</code></pre></td>
</tr>
</table>

</details>

<details>
<summary>Решение <kbd>javascript</kbd></summary>

### 1. Установка зависимостей

```bash
npm install             # Установка зависимостей
```

### 2. Запуск тестирования решения в среде Jest[^1]

```bash
npm run test            # Unit-тестирование
```

</details>

#### Ссылки на документацию

[^1]: [Jest](https://jestjs.io/docs/getting-started)
