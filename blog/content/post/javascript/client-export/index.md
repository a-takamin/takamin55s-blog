---
title: client を作成し export する際のメモ
description: SES クライアントのような外部サービスのラッパーを export するとき、関数を直接 export するか、インタフェースを定義して export するか。テスト容易性の観点で比較するメモ。
summary: 外部サービスの client を作って利用したいとき、どう export するか。関数を直接 export する方法とインタフェースを定義する方法を、テスト容易性（モックのしやすさ）の観点で比較する。
slug: client-export
categories:
  - JavaScript
tags:
  - TypeScript
  - テスト
  - 設計
  - 依存性注入
  - モック
date: "2026-06-11"
---

JavaScript または TypeScript で `client` を作成し利用したい場面にでくわした。

その `client` でやりたいことが少ない場合、どうやって export するか。

例えば自分が直面したのは「Amazon SES を使ってメールを送りたい」という場面。`sendEmail()` ができれば十分。

そのとき

1. `export const sendEmail = () => {}` を export 
2. `client` の `I/F` を定義してそれを export

などが考えられる。

1 のイメージ

```ts
const client = new SESClient();
export const sendEmail = async (): Promise<void> => {...}
```

2 のイメージ

```ts
export interface EmailSender {
  sendEmail: () => Promise<void>
}

export const createEmailSender = (): EmailSender => {...}
```

1 にはテストがしにくい問題点がある。 `import` した時点で `new SESClient` が走ってしまい、モックできない。

2 は `EmailSender` を実装したモックを用意することができる。利用側が具体的な実装ではなくインタフェース `EmailSender` に依存できるため、テスト時にモックを差し込みやすい（依存性注入）。

よって 2 の方がいい。
