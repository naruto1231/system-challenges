# eyemovic システム班課題

## 概要

本リポジトリは eyemovic システム班を希望する方に取り組んで頂く課題についてまとめたものです。

## 課題

課題とその概要は以下の通りになっています。

| タイトル                                                                   | 概要                                                         |
| -------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [qst-0101. URL の抽出(一覧表示)](./qst-0101/README.md)                     | 標準ライブラリを利用した基本的な操作を確認します             |
| [qst-0102. URL の抽出(グループ化と集計)](./qst-0102/README.md)             | 集計処理について標準ライブラリを利用した実装方法を確認します |
| [qst-0201. CLI アプリ](./qst-0201/README.md)                               | SQL の基本的な操作を確認します                               |
| [qst-0202. Web アプリ](./qst-0202/README.md)                               | Web アプリケーションの基本的な構成要素を確認します           |
| [qst-0301. Docker と Nginx を利用したサーバーの構築](./qst-0301/README.md) | Nginx の基本的な設定方法を確認します                         |
| [qst-0302. Virtual Host の設定](./qst-0302/README.md)                      | Nginx を利用した Virtual Host の設定を確認します             |
| [qst-0303. Reverse Proxy の設定](./qst-0303/README.md)                     | Nginx を利用した Reverse Proxy の設定を確認します            |

## 課題の提出について

課題に取り組むには本リポジトリをフォークし、フォークしたリポジトリに対して解答を push してください。

- [フォークについて](https://docs.github.com/ja/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks#about-forks)
- [リポジトリをフォークする](https://docs.github.com/ja/get-started/quickstart/fork-a-repo#forking-a-repository)
- [フォークされたリポジトリを複製する](https://docs.github.com/ja/get-started/quickstart/fork-a-repo#cloning-your-forked-repository)

## 動作環境について

本課題では、以下の環境での動作を想定しています。

- Node.js バージョン 20 以上または PHP バージョン 8.2 以上
- SQLite3
- Docker バージョン 24 以上

言語については、Node.js、PHP のどちらかで実装してください。
他の言語での実装の場合、正しく採点できない可能性があります。

本課題は Unix/Linux 系 OS でのみ動作確認しています。
Windows 環境で課題に取り組む場合は、[WSL](https://learn.microsoft.com/ja-jp/windows/wsl/install)の利用などを検討してください。
