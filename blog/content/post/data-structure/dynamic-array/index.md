---
title: Dynamic Array について
description: Dynamic Array について分かったことを書く
summary: Dynamic Array について分かったことを書く
slug: data-structure-dynamic-array
tags:
  - Data Structure
  - Tech
date: "2026-05-16"
---

データ構造の復習をしている。

## 配列（Array）について
配列の特徴を復習する。

配列は連続したメモリ領域に配置されるデータ構造で、固定サイズのメモリ空間を確保してそこにデータを入れていく。データはインデックスでアクセスすることができる。

- インデックスによるアクセスは定数時間 O(1) で行える
- 連続した空間を確保し、順番やメタデータを保持する必要がないので、メモリ効率がいい
- キャッシュメモリの恩恵を受けて高速にアクセスできる

などのメリットを持つが、

- データの挿入に弱い。要素の位置を 1 つ 1 つずらす必要がある。O(n)
- データの削除も、要素がないことを許さないなら 1 つ 1 つずらす必要がある。O(n)
- 長さが固定で、最初に宣言した長さ以上の要素を入れることができない

などのデメリットがある。

このうち、最後の固定長であるがゆえのデメリットを克服したのが動的配列。

## 動的配列（Dynamic Array）について
動的配列は名前の通り、動的に変化する配列。変化するものは固定サイズだった長さのこと。

配列に挿入したとき、容量を超えてしまう場合は 2 倍の容量の配列を作り直し、元々の要素はその配列の前半にコピーすることで実現している。動的配列というがこんな感じでシンプルな機構なのが面白い。

いつ 2 倍にするか、をうまく取り扱うために `size` (要素数) というプロパティが必要になる。これは配列の length (長さ) とは別で、今いくつ入っているか？というもの。今入っている数が length と同じなら拡張しなければならない。

雑な実装。

```java
public class MyDynamicArray<E> {

    private Object[] array;
    // 現在入っている要素の数
    private int size = 0;

    public MyDynamicArray(int capacity) {
        if (capacity <= 0) {
            throw new IllegalArgumentException("capacity should be positive");
        }
        this.array = new Object[capacity];
    }

    public E get(int index) {
        if (index < 0 || size <= index) {
            throw new ArrayIndexOutOfBoundsException();
        }
        return (E)array[index];
    }

    public void add(E element) {
        if (array.length == this.size) {
            Object[] newArray = new Object[this.array.length*2];
            for (int i = 0, len = this.array.length; i < len; i++) {
                newArray[i] = this.array[i];
            }
            this.array = newArray;
        }
        this.array[size] = element;
        size++;
    }

    public void remove(E element) {
        int foundIndex = -1;
        for (int i = 0; i < this.size; i++) {
            if (Objects.equals(array[i], element)) {
                foundIndex = i;
                break;
            }
        }
        if (foundIndex == -1) {
            return ;
        }
        for (int i = foundIndex; i < size-1; i++) {
            array[i] = array[i+1];
        }
        // ずらした後に残ってしまっている最後の要素を消す
        array[size-1] = null;
        this.size -= 1;
    }

    public int size() { return this.size; }
}
```

なお、Java では `ArrayList` 型が動的配列を表す。なので自前実装する意味はない。

## size について
日本語でサイズといえば大きさを表すので、配列の大きさ = 容量という脳内マッピングをしてしまいそうですが、ArrayList （動的配列）における `size` は「要素数」です。容量は動的配列の場合は `array.length` ですね。引数で値を受け取る場合は `capacity` という言葉にしがちです。

ややこしいので注意。
