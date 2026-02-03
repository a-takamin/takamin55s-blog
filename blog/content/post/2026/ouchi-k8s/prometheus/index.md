---
title: Prometheus をおうち K8s に立てるまで
description: おうちK8sにPrometheusを立てた話。
summary: おうちK8sにPrometheusを立てることを通して PVC と storage-class に触れました。
slug: prometheus-setup
tags:
  - おうちK8s
  - Tech
date: "2026-01-31"
---

おうち K8s に Prometheus を立てました。

Prometheus という単語はよく聞くものの、何者なのかがよく分かっていなかったためです。デプロイして触ることでどのようなものか理解したいと思います。

## Prometheus をおうち K8s に立てる
調べてみると、どうやら `kube-prometheus-stack` という Helm Chart を使うのがよさそうです。

https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack

しかしこの Helm Chart, Prometheus の公式に載っていなくて見つけるのに苦労しました（AI が教えてくれた）。公式ではなくコミュニティが管理しているからとのことですが、公式に載せてくれてもいいのに。

README を読んでみると、これにはいくつかのコンポーネントが含まれているようです。

- Prometheus Operator
- Prometheus
- Alertmanager
- node-exporter
- kube-state-metrics
- Grafana

Operator はそれっぽく使っていますがよく分かっていないので調べてみます。  
おうち K8s を通していろいろ学んでいきたいので遠回り大歓迎。

### Operator とは
公式を読んでみます。  
https://kubernetes.io/ja/docs/concepts/extend-kubernetes/operator/

> オペレーターはカスタムリソースを使用する Kubernetes へのソフトウェア拡張です。

カスタムリソースとは。その名の通りカスタムリソースでした。  
つまり、Kubernetes における標準的なリソース（Pod とか Service とか）とは別に自分たちで定義できるリソースのことです。

https://atmarkit.itmedia.co.jp/ait/articles/2109/10/news013.html

カスタムリソースを定義することで、Kubernetes の仕組みに則りながら新しい概念を追加できます。Kubernetes の仕組みに則るので Controller も必要になります。

そこに対してもう一つ上のレイヤーとして Operator が存在するようです。Operator は Controller を内包し、カスタムリソースに固有のライフサイクルを管理します。

今回の `Prometheus Operator` は Prometheus に特化した Operator ということですね。  
例えば Prometheus のアップデートを宣言的に書くだけで実行してくれたりします。

### Prometheus を ArgoCD でデプロイする
Helm Chart を使います。ArgoCD は Helm Chart のデプロイにも対応していて便利だ。

ところで Prometheus の Helm Chart は Grafana を含んでいるようです。以前この記事で Grafana を立てたのですが、せっかくなので（？）これは削除して Prometheus と一緒に管理することにします。

https://blog.takamin55.dev/post/grafana-setup/

ArgoCD で Helm Chart を扱うにはこのように書けばよいようです。

```yaml

```