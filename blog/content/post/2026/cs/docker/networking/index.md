---
title: Docker Network から学んでいくネットワーク
description: Docker Network からネットワークについて学びます。
summary: ネットワーク苦手マンなので、Docker Network を使ってネットワークについて学んだ記事です。
slug: network-learning-from-docker
tags:
  - 独学CS
  - Tech
date: "2026-01-25"
---

ネットワーク何にも分からないですよね。  

おうち Kubernetes も始めたので、Docker Network を使ってネットワークを学んでみようと思います。  

Kubernetes のネットワークもそのうちやります。なお網羅性はないことには注意。

## コンテナ同士の通信に使われている技術
コンテナは「独立した環境だ」と言われています。  

ネットワークもきちんと独立しています。例えば 2 つのコンテナは同じポート番号を使えるのは 1 つの独立の証拠です。試しに `nginx` を 2 台立てます。
```sh
docker run --rm -itd --name nginx1 nginx
docker run --rm -itd --name nginx2 nginx

CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS     NAMES
4a9b136c6f27   nginx     "/docker-entrypoint.…"   2 seconds ago    Up 1 second     80/tcp    nginx2
7e54756cdc2a   nginx     "/docker-entrypoint.…"   12 seconds ago   Up 12 seconds   80/tcp    nginx1
```
どちらも `80` 番ポートを持っていますね。独立していなければ同じポート番号は持てませんから、確かに独立していそうです。

もちろんポート番号以外にも分離は確認できます。例えばどちらも同名の `eth0` を持っており、ネットワークインターフェースの空間も分離されていることが分かります。

コンテナのネットワーク空間が分離されていることは分かったのですが、ではコンテナ同士は通信可能なのでしょうか？

`nginx` は中に何もツールが入っていないので代わりに `busybox` 2 つを立て直し、 `ping` コマンドで通信を試みます。

```sh
docker run --rm -itd --name b1 busybox
docker run --rm -itd --name b2 busybox

docker exec -it b1 ip addr
docker exec -it b2 ip addr
```

`ip addr` コマンドでそれぞれ `172.17.0.2` と `172.17.0.3` という IP アドレスが振られていることが分かったので、 `b1` から `b2` に `ping` を飛ばしてみます。

```sh
docker exec -it b1 ping 172.17.0.3`

64 bytes from 172.17.0.3: seq=0 ttl=64 time=0.100 ms
...
```

`ping` が通ります。ではどうやってコンテナ同士は通信できたのでしょうか。  

ところでこの記事はネットワークに入門する記事だったので、寄り道して `ip addr` と `ping` を復習しておきます。

### ip addr と ping
`ip addr` は ip コマンドのサブコマンドで、名前の通りネットワークデバイスのアドレス情報を表示します。昔は `ifconfig` コマンドを使っていました（へぇ）。

```sh
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
17: eth0@if18: <BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN> mtu 1500 qdisc noqueue
    link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.2/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever
```

`lo` や `eth0` がインターフェースの名前です。  

`lo` (loopback) は自分自身への通信に使うインターフェースで、 `eth0` はイーサネットのインターフェースです。

あと注目するべきなのは `UP` というフラグと `inet` ですね。`UP` はインターフェースが有効であることを示しており、`inet` は IPv4 アドレスを示しています。

とにかく、コンテナは `eth0` という名前のネットワークインターフェースを持ち、 `172.17.0.2` という IP アドレスが振られていることがコマンドのおかげで分かりました。

`ping` は ICMP プロトコルを使って相手にエコーリクエストを送り、相手からのエコーリプライを受け取ることで通信ができるか確認するコマンドです。

レイヤーとしては `L3` で、ICMP は IP プロトコルの上に乗っかっているので IP アドレスが分からないと通信できません。

### コンテナ同士が通信できた理由
本題に戻ります。コンテナ同士が通信できた理由です。

そもそも通信は "繋がって" いないとできません。なのでコンテナ同士は通信経路があるというわけですが、どのように繋がっているのでしょうか？

`ping 172.17.0.3` の `ping` は IMCP プロトコルで、IP アドレスを使った L3 レイヤーの通信だと分かりました。 
L3 レイヤーの通信はルーティングがあるはずなので、その情報を見てみましょう。

```sh
docker exec -it b1 ip route

default via 172.17.0.1 dev eth0
172.17.0.0/16 dev eth0 scope link  src 172.17.0.2
```

ネットワークはなんでも `ip` コマンドです。`ip route` はルーティングテーブルを表示します。

1 行目の見方は「デフォルトルート（他にマッチしない宛先）宛ての通信はデバイス `eth0` を使って `172.17.0.1` を経由（してどこかへ行く）」という意味です。

2 行目の見方は「 `172.17.0.0/16` 宛ての通信はデバイス `eth0` を使って、リンクスコープなので直接通信を行う（L2 を使う）。送信元 IP は `172.17.0.2`」という意味です。

さっき行った `ping 172.17.0.3` は 2 行目にマッチするので、`eth0` を使って直接通信を行うことになります。

直接通信ということは直接つながっているわけですが（コンテナなので物理的には繋がっていないが論理的には繋がっているということ）、いつ繋げましたっけ？

ここで Docker Network の登場です。  

Docker はデフォルトで `bridge` という名前のネットワークを作成しており、コンテナは特に何も指定しなければこのネットワークに接続します。

`bridge` ネットワークの情報を見てみましょう。

```sh
docker network inspect bridge

[
    {
        "Name": "bridge",
        "Scope": "local",
        "Driver": "bridge",
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.17.0.0/16",
                    "Gateway": "172.17.0.1"
                }
            ]
        },
        "Containers": {
            "e434a75ce361c55f9c98c7bf1f6dc77883be4633d2291bb5a12a767add450b96": {
                "Name": "b1",
                "MacAddress": "02:42:ac:11:00:02",
                "IPv4Address": "172.17.0.2/16",
                "IPv6Address": ""
            },
            "f850092d29490815d60b4680933d84b1e96e734aa6b9d156ef89813acc80e0a2": {
                "Name": "b2",
                "MacAddress": "02:42:ac:11:00:03",
                "IPv4Address": "172.17.0.3/16",
                "IPv6Address": ""
            }
        },
        "Options": {
            "com.docker.network.bridge.default_bridge": "true",
            "com.docker.network.bridge.enable_icc": "true",
            "com.docker.network.bridge.enable_ip_masquerade": "true",
            "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
            "com.docker.network.bridge.name": "docker0",
            "com.docker.network.driver.mtu": "1500"
        },
        "Labels": {}
    }
]
```

※いくつか情報は省いています。

`Containers` 欄に `b1` と `b2` の情報が載っています。このネットワークに 2 つのコンテナが「接続」されていることが設定として確認できました。  

また `bridge.name` に `docker0` とありますが、これが `bridge` ネットワークにあるブリッジの名前です。`docker0` ブリッジはホスト OS 側に存在していて、これがコンテナ同士の通信を仲介しています。 

つまり以下のような接続がなされているわけです。
```
[b1(eth0)] <-> [docker0 ブリッジ(ホスト OS 側)] <-> [b2(eth0)]
```

残念ながら Docker Desktop 環境なのでホスト OS 側で `docker0` ブリッジの存在を確認することはできません。。Linux 環境であれば実際にホスト側で `docker0` というインターフェースを確認できるようです。確認できたらより納得感があるのに。


とにかく、コンテナ同士は繋がっているので、通信できたというわけですね。

### ※そもそもブリッジについて
そもそもブリッジとは L2 レイヤーでのちょっとした通信制御を可能にした機器です。以下のような経緯で生まれたと考えると理解しやすいです。

1. ホスト同士をケーブルで繋いで通信✅
2. 距離等による信号の減衰の問題✖を「リピーター」で解決✅
3. 複数のホストを繋ぐ際に接続点が増えてしまう問題✖を「ハブ」で解決✅
4. ハブは全ホストに通信をばらまくので衝突が起きやすく通信効率が悪い問題✖を「ブリッジ」で宛先転送or遮断できるようになり解決✅

ブリッジは宛先 MAC アドレスをみて通信を転送するか遮断するかを判断するので、衝突が起きにくくなりました。

また遮断があるということはネットワークが分割されるため、ブリッジにより「セグメント」という概念が誕生しました。

## Docker Network の種類
先ほどは `bridge` タイプの Docker Network を見ましたが、他にも種類があります。

### bridge
さっきみたやつです。ホストに Bridge を作成してコンテナ同士をつなげます。

### host
ホストのネットワーク空間をそのままコンテナに割り当てます。  
つまりコンテナのネットワーク分離がなくなります。ポートの重複などが許されないので注意。

### none
コンテナにネットワークインターフェースを割り当てないタイプです。

### overlay
複数ホストにまたがるネットワークを構築します。つまり 2,3 台のホストにそれぞれいるコンテナ同士が、まるで同じ LAN にいるかのように通信できるようになります。

### macvlan
コンテナをホストから物理マシンかのように扱えるようになります。  
通常コンテナはホストから端末として見えませんが、このタイプを使うとコンテナごとに MAC アドレスを割り当てられ、 物理マシンのように見えるようになります。

## まとめ
Docker Network の世界でコンテナ同士がどうやって通信しているのかをベースに、ブリッジやリピーター、ハブなどのネットワーク機器や、L2/L3 レイヤーの話、また `ip addr` や `ip route` コマンドの使い方など、ちょっとしたネットワーク基礎知識を学びました。

自分に身近な技術からであればスッと入っていける気がしますね。
