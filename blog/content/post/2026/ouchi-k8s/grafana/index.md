---
title: Grafana をおうち K8s に立てるまで
description: おうちK8sにGrafanaを立てた話。
summary: おうちK8sにGrafanaを立てることを通して PVC と storage-class に触れました。
slug: grafana-setup
tags:
  - おうちK8s
  - Tech
date: "2026-01-30"
---

おうち K8s に Grafana を立てました。

持っておけば何かを可視化するときに便利だろうと思ったのがきっかけです。現状可視化したいのはおうち K8s の状態と、自分の体重の推移ですね…。

Grafana を立てるまでの手順を書いていきます。

## Grafana をおうち K8s に立てる
まずは公式ドキュメントを読みました。

https://grafana.com/docs/grafana/latest/setup-grafana/installation/kubernetes/

マニフェストを直接扱う方法と Helm Chart を使う方法が紹介されていました。  
マニフェストがそれほど複雑ではなさそうだったので、今回はマニフェストを直接扱う方法で進めることにしました。

Grafana のマニフェストを詳しく読んでみます。  
大きく分けて `PersistentVolumeClaim`, `Deployment`, `Service` の 3 つのリソースが定義されていました。

### PersistentVolumeClaim
読み解くべきはこのあたりでした。

```yaml
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

`accessModes` は自分にとって初めて出てきた概念です。  
どうやら、PV をどのように扱うのかを宣言するもののようです。

今回は `ReadWriteOnce` なので、ボリュームはシングルノードで read-write 権限でマウント可能なものを欲しいと宣言しています（Pod は複数の可能性あり）。

他にも `ReadOnlyMany` (複数ノードによって read-only でマウント可能) や `ReadWriteMany` (複数ノードによって read-write 権限でマウントされる可能性あり) などがあるようです。

おうち K8s の default StorageClass は `local-storage` で `no-provisioner` タイプになっていました。どうしてそう設定したのか全く覚えていないのですが、調べてみると local-storage は動的にプロビジョニングできないようなので、FreshRSS をデプロイするために過去の自分は頑張ったんだなぁと思いました。

`local-path-provisioner` というものを導入すれば、動的にプロビジョニングできるようになるようです。

https://github.com/rancher/local-path-provisioner

後学のために導入してみます。Kustomize を使ってデプロイしました。

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - https://raw.githubusercontent.com/rancher/local-path-provisioner/v0.0.34/deploy/local-path-storage.yaml
patches:
  - target:
      kind: StorageClass
      name: local-path
    patch: |-
      - op: add
        path: /metadata/annotations/storageclass.kubernetes.io~1is-default-class
        value: "true"
```

ArgoCD でデプロイ後、コマンドを打って確認してみました。問題なくデフォルトになっていそうです。

```bash
$ kubectl get storageclass
NAME                   PROVISIONER                    RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
local-path (default)   rancher.io/local-path          Delete          WaitForFirstConsumer   false                  52s
local-storage          kubernetes.io/no-provisioner   Delete          WaitForFirstConsumer   false                  13d
```

では PVC はこれで大丈夫そうですね。

### Deployment と Service
TailScale を通してアクセスするので `LoadBalancer` じゃなくて `ClusterIP` に変更しました。

またポートを指定したくないので 3000 番から 80 番に変更しました。

### Grafana をデプロイする
ArgoCD を使って Grafana をデプロイします。特に書くことはありませんでした。

### Grafana にアクセスする
TailScale で IP を確認し、無事アクセスできました。

## 終わりに
今回は Grafana をおうち K8s に立てるまでを通して PVC と storage-class に触れられたのでヨシです。
