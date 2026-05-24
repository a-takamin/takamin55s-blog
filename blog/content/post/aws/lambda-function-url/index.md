---
title: Lambda の Function URL（関数 URL）で知っておいた方がいいこと
description: Lambda の Function URL（関数 URL）で知っておいた方がいいことを書きます。
summary: Lambda の Function URL（関数 URL）で知っておいた方がいいことをまとめた記事
slug: about-lambda-function-url
tags:
  - AWS
  - Tech
date: "2026-05-24"
---

`Lambda` の `Function URL`（関数 URL）について書く。

## どういう経緯・課題で生まれたものか
歴史を知ると存在意義が分かり、頭にスッと入ってくる。

`Lambda` 関数はサーバーレスの象徴的存在だったが、登場してしばらくの間は外部から呼び出すのがそこそこ面倒だった。前段に `API Gateway` を構える必要があったからだ。

`API Gateway` は名前の通り `API gateway` として使うサービスなので、いろんな機能が存在する。それこそセットアップのために `Resource`, `Method`, `Integration` とか色々いじらないといけなかったし、REST API はデフォルト 29 秒でタイムアウトするなどの面倒な制約があった。`Lambda` の実行時間が 15 分なので厳しすぎる。

そこで `Lambda` を簡単に外部から叩く仕組みとして `Function URL` が `GA` した。

`Function URL` を使えば `Lambda` 関数に対して `https` のエンドポイントを 1 つ生やすことができる。設定が超簡単になった。

## Function URL の特徴や制限など
超簡単・超便利な Lambda の Function URL だが、その対価として知っておくべき制限がある。

### 認証
認証は `AWS_IAM` か `NONE` の 2 種類のみ。

`AWS_IAM` は `SigV4`（AWS の認証情報を使った署名プロトコル）で署名されたリクエスト（認証）かつ `lambda:invokeFunctionUrl` の権限を持つ（認可）プリンシパルのみが関数を叩けるというもの。

`NONE` は誰でも叩ける。

### 呼び出しモード
モードは `BUFFERED` か `RESPONSE_STREAM` のどちらか。

`BUFFERED` は通常のリクエスト・レスポンスで、`Lambda` が処理を完了したら結果を返すよ、ということ。

`RESPONSE_STREAM` はストリーム。

### パスルーティング機能はない
`Lambda` を呼ぶだけ、というシンプルな処理。
パスごとに処理を変えたければ `handler` でそれをみて振り分ける必要性がある。

### カスタムドメイン
なし。欲しければ `CloudFront` を構える。

### WAF
なし。欲しければ `CloudFront` を構える。

### 公開範囲
常に public。叩かれたくなければ IAM でプリンシパルを狭めること。

### CORS
`Cross-Origin Resource Sharing`。つまりオリジンが異なる場合の設定。

ブラウザは同一オリジンじゃないと `fetch/XHR` のレスポンスを読ませてくれない。

しかし `Function URL` のオリジンは `https://xxx.lambda-url.region.on.aws` こんな感じなので、フロントエンドのオリジンと一致することはまずありえない。（`CloudFront` を前段に構え、フロントも同じ `CloudFront` から提供すれば `CORS` 設定は不要にできる）。

なので `CORS` を設定する必要があるが、`Lambda Function URL` は組み込みで `CORS` 設定が使える。流石にね。。

### レートリミット・スロットリング
`API Gateway` にはあったが、もちろんこちらにはない。

## 終わりに
Lambda を便利に公開できるようになった。
