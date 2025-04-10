# Минимальная ПСП

[<kbd>algorithm</kbd>](https://contest.yandex.ru/contest/66794/problems/F/)

Напомним определение правильной скобочной последовательности (ПСП):

-   пустая строка — правильная скобочная последовательность;
-   правильная скобочная последовательность, взятая в скобки одного типа — правильная скобочная последовательность;
-   правильная скобочная последовательность, к которой приписана слева или справа правильная скобочная последовательность — тоже правильная скобочная последовательность.

Пусть символы ’[’, ’]’, ’(’ и ’)’ некоторым образом упорядочены. Рассмотрим все ПСП длины $n$ состоящие из круглых и квадратных скобок иначинающиеся со строки $s$. Среди этих ПСП необходимо найти лексикографически минимальную.

Строка $A$ лексикографически меньше строки $B$ (их длина совпадает), если существует такое $i$, что для всех $j<i$ $A_j=B_j$​ , а $A_i<B_i$​ .

Лексикографический порядок скобок задается строкой $w$, состоящей из $4$ символов. При этом $w_1<w_2<w_3<w_4$ . Например, если $w=()[]$, то $(<)<[<]$.

<details>
<summary>Форматы ввода/вывода и примеры</summary>

## Формат ввода

В первой строке записано число $n$ $(1 \leq n \leq 100000)$.

Во второй строке записана строка $w$, состоящая из $4$ различных скобок.

В третьей строке записана строка $s$, ее длина не превосходит $n$.

## Формат вывода

Выведите ответ на задачу. Гарантируется что он существует.

### Пример 1

<table width = "100%">
<tr>
<th>Ввод</th> <th>Вывод</th>
</tr>
<tr valign="top">
<td><pre>
<code>6
()[]
([(
</code></pre></td>

<td><pre>
<code>([()])
</code></pre></td>
</tr>
</table>

### Пример 2

<table width = "100%">
<tr>
<th>Ввод</th> <th>Вывод</th>
</tr>
<tr valign="top">
<td><pre>
<code>6
][)(
([
</code></pre></td>

<td><pre>
<code>([][])
</code></pre></td>

</tr>
</table>

### Пример 3

<table width = "100%">
<tr>
<th>Ввод</th> <th>Вывод</th>
</tr>
<tr valign="top">
<td><pre>
<code>4
(][)
()[]
</code></pre></td>

<td><pre>
<code>()[]
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
