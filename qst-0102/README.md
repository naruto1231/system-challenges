# 1-2. URL の抽出(グループ化と集計)

1-1 のプログラムを改変して、同じオリジンを持つ URL をグループ化して表示するプログラムを作成してください。

本来オリジンとは、スキーム(`https`、`http`)、ホスト、ポート番号の組み合わせを指しますが、
本問では「**スキームとホストの組み合わせ**」とし、ポート番号は考慮しないものとします。

[Origin (オリジン)](https://developer.mozilla.org/ja/docs/Glossary/Origin)

本問の解答には`ans-0102`というディレクトリを作成し、その中でディレクトリやファイルを作成してください。

## 目次

- [1-2. URL の抽出(グループ化と集計)](#1-2-url-の抽出グループ化と集計)
  - [目次](#目次)
  - [プログラムの実行](#プログラムの実行)
  - [出力形式](#出力形式)
  - [要件](#要件)
  - [実行と出力の例](#実行と出力の例)

## プログラムの実行

プログラムは以下の形式で実行します。

```txt
${execution} ${filepath}
```

- `${execution}`はファイルを指定してプログラムを呼び出す箇所です
  - Node.js の場合は`node main.js`となります
  - PHP の場合は`php -f main.php`となります
- `${filepath}`は URL を抽出するファイルのパスです

## 出力形式

本プログラム実行次の出力形式は以下をオリジン別に繰り返す形式とします。

```txt
origin=${origin} total=${total}
${url}
${url}
...
${url}
```

- `${origin}`はオリジンを示します
- `${total}`は同じオリジンに含まれる URL の数です
- `${url}`にはそのオリジンに含まれる URL が改行区切りで表示されます
- `${url}`の出力数は`${total}`と同じ数になります
- `${url}`の最後と次の`${origin}`の間には空行が 1 行入ります

## 要件

- `eyemovic.txt`は UTF-8 でエンコードされていて、改行コードは LF(`\n`)です
- 抽出する対象となる URL は`http://`または`https://`から始まり、半角のシングルクォーテーション(`'`)または半角のダブルクォーテーション(`"`)で囲まれているものです
- URL の抽出には正規表現を使用してください
  - [JavaScript の正規表現](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_expressions)
  - [PHP の正規表現](https://www.php.net/manual/ja/book.pcre.php)
- 標準出力に結果を出力する際は上記の出力形式を守ってください
- `${origin}`はアルファベットの昇順でソートしてください
- `${origin}`でグループ化された`${url}`はアルファベットの昇順でソートしてください
- 実装の際はその言語に付属する標準ライブラリのみを使用してください
- 実装は 1 ファイルで行ってください
  - Node.js の場合は`main.js`というファイル名にしてください
  - PHP の場合は`main.php`というファイル名にしてください

## 実行と出力の例

Node.js での実行例を以下に示します。`$`はシェルのプロンプトを表します。

```bash
$ node main.js ./eyemovic.txt
origin=http://www.w3.org total=2
http://www.w3.org/2000/svg
http://www.w3.org/2000/svg

origin=https://ajax.googleapis.com total=2
https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js

origin=https://api.w.org total=1
https://api.w.org/

(中略)

origin=https://www.instagram.com total=2
https://www.instagram.com/eyemovic.inc/
https://www.instagram.com/eyemovic.inc/
```
