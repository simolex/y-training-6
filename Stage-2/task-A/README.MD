# Префиксные суммы

[<kbd>algorithm</kbd>](https://contest.yandex.ru/contest/66793/problems/A/)

По данной последовательности $a_1$,$a_2$, ..,$a_n$​ вычислите последовательность ее префиксных сумм $b_1$,$b_2$, ..,$b_n$​ ,

где $b_j= \displaystyle \sum_{n=1}^{j} a_j$​ .

<details>
<summary>Форматы ввода/вывода и примеры</summary>

## Формат ввода

В первой строке дано целое число $n$ $(1 \leq n \leq 10^3)$ — количество элементов в последовательности aa. Во второй строке дано nn целых чисел $a_1$,$a_2$, ..,$a_n$​ $(∣a_i∣ \leq 10^6)$ — элементы последовательности.

## Формат вывода

Выведите $n$ целых чисел $b_1$,$b_2$, ..,$b_n$​ — последовательность префиксных сумм для последовательности $a$.

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
