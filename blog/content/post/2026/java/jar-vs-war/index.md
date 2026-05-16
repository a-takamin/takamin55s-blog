---
title: jar と war どっち問題と Servlet Container について
description: SpringBoot でパッケージを jar にするのか war にするのか問題について書く。あと Servlet Container についても書く。
summary: SpringBoot でパッケージを jar にするのか war にするのか問題について書く。あと Servlet Container についても書く。
slug: jar-vs-war
tags:
  - Java
  - Tech
date: "2026-05-16"
---

SpringBoot でプロジェクトを作成するときに `jar` にするか `war` 形式にパッケージングするか選択できる。

どっちにすればいいのか問題が発生するので書く。

## 結論: ほぼ jar
war は Web Application Archive の略で、Servlet Container にデプロイするための形式。対して jar は汎用的に使える Java Archive 形式。

SpringBoot は内部に Servlet Container を含んだパッケージを生成できるので、jar ファイルの方がいい。jar を実行するだけで Web Application が立ち上がるから。

もし Servlet Container を自前運用しているなら war になるが、現代だとなかなかレアだと思われる。

## Servlet と Servlet Container
存在を簡単に理解できるよう以下を最初に書いておく。

- Servlet も Servlet Container もどちらも Java アプリ
- Servlet と Servlet Container は Java で Web アプリケーションを提供するためのもの

Java で Web アプリケーションを作る。つまり HTTP リクエストを受け付けて任意の処理を実行してレスポンスを返したい。

なのでまず物理サーバーが必要。OS も必要。そして Java なので JVM も必要。ここまでで準備はできた。

サーバーが HTTP リクエストを IP + ポートで受け付けると、そのポートにマッピングされているプロセスに処理をお願いするが、その時に HTTP リクエストと Java の世界の橋渡しをするのが Servlet Container という Java アプリケーション。

Servlet Container は HTTP リクエストを読み取って `HttpServletRequest` という Java オブジェクトを作り、Java の世界で扱えるようにする。

そしてその後 `HttpServletRequest` を Servlet に渡して、具体的な処理をお願いする、という関係。

Servlet は意味的には「サーバーで動かす Java の小さなプログラム」を指し、実態としては「Servlet Container から呼び出されるという規約に従ったクラス（規約に従うために Servlet API (`HttpServlet` 等) を実装している必要がある）」というもの。
