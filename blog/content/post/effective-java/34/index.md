---
title: Effective Java 34 int 定数の代わりに enum を使う
description: Effective Java 34 を読んだ感想
summary: enum を使う時は外部に switch を分離せずに定数に紐づけることを意識したい
slug: effective-java-34
tags:
  - Effective Java
  - Tech
date: "2026-05-16"
---

int enum パターンというものがある。

```java
public class ChessPiece {
  public static final int PAWN = 1;
  public static final int KNIGHT = 2;
  public static final int BISHOP = 3;
  public static final int ROOK = 4;
  public static final int QUEEN = 5;
  public static final int KING = 6;
}
```

どこか見たことがあるような、ないようなコードだ。
やりたかったことはシンプルで「チェスの駒を表現したい」というもの。だからチェスのピースを `public static final` で定数として宣言し、それぞれに ID を振っている。

これは `int enum パターン` と呼ばれる。列挙できたように見えるが問題がある。

## int enum パターンの問題
### 1. 型が int であることによるリスク
ChessPiece はチェスの駒を定数で表現しているが、型レベルで見ると所詮は int 型だ。我々は 1~6 を受け取ることを期待するが、それは「暗黙の了解」レベルであり、型レベルでは保証されていない（型レベルでは 2^32 通りが許される）。

以下のようなことが平気で起こってしまう。

```java
void printChessPiece(int id) { ... };

printChessPiece(99); // !?
```

### 2. 振る舞いが定数と分離する
BISHOP は斜めに進む、ROOK は縦横に進む、という振る舞いを表現しようと思うと、`int enum パターン` に対しては以下のように `if` や `switch` を書かざるを得ない。

```java
Move getMove(int chessPiece) {
  switch (chessPiece) {
    case ChessPiece.PAWN: return PawnMove;
    case ChessPiece.KNIGHT: return KnightMove;
    ...
  }
}
```

振る舞いが増えるたびに、このような `switch` が至る所に大量発生して散らばってしまう。

## enum なら解決
他にもいくつか問題はあると思うが割愛し、このような問題を `enum` なら解決できるぞ、という例を書く。

```java
public enum ChessPiece {
  PAWN {
    @Override
    Move getMove() { return PawnMove; }
  },
  KNIGHT {
    @Override
    Move getMove() { return KnightMove; }
  },
  ...
  ;

  public abstract Move getMove();
}
```

先ほどは駒を `int` 型でしか扱えなかったが、`enum` で宣言すればそれぞれの駒を `ChessPiece` 型として扱える。つまり以下のように安全に扱える。

```java
// 安全！変なものが入り込まない
void printChessPiece(ChessPiece piece) { ... };
```

また `getMove()` という振る舞いを列挙子に紐づけることができているので、振る舞いが散らばらず保守しやすい。ポリモーフィズム的に扱える。

## 終わりに
`enum` がない世界を想像することで `enum` のメリットがわかりやすくなった。

`switch` で振る舞いを分離させるとコードが散らばってしまう上に `default` などの例外を考慮しなければならなくなるので、振る舞いは定数に紐づけるように意識したい。
