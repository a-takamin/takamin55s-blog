---
title: record 型を使うか lombok を使うかについて
description: record 型を使うか lombok を使うかについて書く。アノテーションも色々みてみる。
summary: record 型を使うか lombok を使うかについて書く
slug: record-vs-lombok
tags:
  - Java
  - Tech
date: "2026-05-17"
---

Java でアプリケーションを書いていると、`DTO` がちょこちょこ出現する。
DTO は `Data Transfer Object` の略で、データを「受け渡し」させるために一時的にデータを保持するオブジェクトだ。

異なるレイヤー間でデータを「受け渡す」ために存在する。例えばアプリケーションが HTTP リクエストを受け付ける際、リクエストボディを Java のオブジェクトにマッピングするが、これはまさに DTO である。

DTO はデータを受け渡すために使われるので、以下のような特徴を持っていると嬉しい。

- final なフィールド（更新されない前提）
- public なコンストラクタ
- getter メソッド（値を取得するため）

加えて、何らかの出力のための `toString()` や、比較のための `equals()` や `hashCode()` も実装が必要かもしれない。

これらを DTO ごとに用意するのは面倒で、何度も同じようなコードを書かなければならない。しかし `record` 型か `Lombok` を使えばその実装コストを削減できる。

## record 型を使う
record 型を使えば以下を書くだけで済む。

```java
public record User(String name, int age) {}
```

なんとこれだけ。

- レコードコンポーネント（引数っぽいやつ）は自動的に `private final` なフィールドになる
- public コンストラクタが自動で生成されてフィールドに代入される
- アクセサメソッドが生える
- toString() が自動で実装される。出力形式は `User[name=Takamin, age=5]`
- equals() が自動で実装される
- hashCode() が自動で実装される

夢のような自動化がなされる。

## Lombok を使う
record 型を使わず `lombok` を使って表現する方法もある。

`lombok` は Java のライブラリで、DTO を作るために必要なコードをアノテーションをつけるだけで実現してくれる。

```java
@Value
public class User {
  String name;
  int age;
}
```

これだけ。 `@Value` アノテーションをつけるとフィールドはやはり `final` になり、public コンストラクタも生える。

`lombok` には他にも便利なアノテーションがあるのでいくつか書いておく。

### @Data
mutable なデータクラスを作成する。mutable なので `@Value` と違って `final` はつかないし setter メソッドも生える。

### @RequiredArgsConstructor
`final` なフィールドを引数に要求するコンストラクタを自動で作成する。Spring の DI とよく組み合わせられているやつ。

### @Builder
ビルダーパターンの実装を自動で作成する。フィールド数が多い時に便利。

## record か lombok か
DTO を作る時はなるべく簡潔な record を使うのが望ましそう。record だと不便な時に lombok を検討する。

例えばビルダーパターンの方が好ましい場合や、特定のフィールドは getter を用意せず隠したい場合など。

## ObjectMapper との相性について
record 型は `setter` メソッドをはやさないので `jackson` などの ObjectMapper と相性が悪いように見えるが、実は `jackson` 側に特別対応が入っていてそのまま使える。

`@JsonIgnore` なども使える。

## 終わりに
record 使っていきましょ。
