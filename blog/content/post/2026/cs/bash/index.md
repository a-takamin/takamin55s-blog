---
title: 監視にまつわるLinuxコマンドに入門する
description: 監視にまつわる Linux コマンドに入門した際の記事です。
summary: Linux コマンドはその都度調べていますが、今回はお試しで監視にまつわる Linux コマンドに入門する YouTube 動画を見てみました。
slug: bash-monitoring-tutorial
tags:
  - 独学CS
  - Tech
date: "2026-01-26"
---

おうち K8s に入門したので監視にまつわるコマンドを使っていくことになりました。  

そのためここらで監視にまつわる Bash コマンドを学ぼうと思います。

## lsof コマンド
`lsof` は List Open Files の略です。その名の通りプロセスが開いているファイルに関する情報を出力してくれるコマンドです。

Linux はすべてファイルなので、Open しているファイルなら実質なんでも見れちゃいます。

