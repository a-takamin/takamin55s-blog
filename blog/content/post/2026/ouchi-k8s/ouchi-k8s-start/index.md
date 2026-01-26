---
title: ミニ PC を買っておうち K8s を構築した
description: ミニPCを購入し、そこにおうちK8sを構築した過程の記事です。
summary: ミニ PCをUbuntu化し、kubeadmを使ってKubernetesクラスターを構築しました。ArgoCDとTailscale Operatorも導入した記録を書きます。
slug: ouchi-k8s-started
tags:
  - おうちK8s
  - Tech
date: "2026-01-24"
---

最近ミニ PC を買いました。  
おうち Kubernetes を立てて遊んでみるためです。

Kubernetes を勉強するぞ！と意気込んで minikube などを使って簡易的に環境を用意するわけですが、結局ローカル PC の隙間を縫って起動している Kubernetes なんて継続的に触らないものです。  

とはいえ EKS や EC2 などのクラウドを利用するのも継続的にお金がかかります。  

それならミニ PC を買ってそれを Kubernetes 専用基盤にすれば流石に触るのでは？と思い買ってみたのですが、まさにその取り組みが功を奏しました。

## K8s 環境のセットアップ
ほとんどこちらの記事を参考にしました。  
https://qiita.com/nkserveren26/items/92be90a3eb4ed19e411e

### ミニ PC の設定編
ミニ PC には `Windows` が入っています。  
要らないのでもちろん `Ubuntu` に入れ替えます。ここの手順については割愛。

まずはミニ PC のアップデートをします。

```bash
sudo apt update & sudo apt upgrade -y
```

その後ファイアウォールを有効化しました。  
Wi-Fi ルーターがある一般家庭ネットワークなので流石に外部からの攻撃はないかな？と思いつつも防御の多層化は大事ですね。

```bash
sudo ufw enabled
```

どこからでもミニ PC を操作したかったので Tailscale を入れました。

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
sudo systemctl enable tailscaled
```

Tailscale を入れると `tailscale0` という仮想 NIC が生えるので、ファイアウォールでそこからの通信を許可しておきます。

```bash
sudo ufw allow in on tailscale0
sudo ufw reload
```

SSH も入れておきます。

```bash
sudo systemctl status ssh

sudo apt install -y openssh-server
sudo systemctl enable --now ssh
```

接続元端末の公開鍵も置いておきましょう。

続いて swap 機能をオフにしました。  
kubeadm を使うには swap が無効である必要があります。  

`sudo swapoff -a` だけだと再起動すると戻ってしまうので、`/etc/fstab` の設定もコメントアウトしておきます。

```bash
sudo swapoff -a
sudo vi /etc/fstab
# /swap.img	none	swap	sw	0	0
```

### コンテナ環境の構築編
ドキュメントに従ってコンテナランタイムをインストールしていきます。  
https://kubernetes.io/ja/docs/setup/production-environment/container-runtimes/

> IPv4フォワーディングを有効化し、iptablesからブリッジされたトラフィックを見えるようにする
の欄に書かれてあるコマンドを実行します。

何をやっているのかよく分からないので調べてみました。

`/etc/modules-load.d/` は `systemd` 起動時に読む設定に関するディレクトリで、そこに新たな設定ファイルを加えたのです。加えた内容は `overlay` と `br_netfilter` モジュールを明示的に読み込む、というものです。

`overlay` は Docker を使っていると見かけるモジュールで、複数のディレクトリを重ねて仮想的に 1 つのディレクトリに見せる仕組みです。  

なんでわざわざそんな事をしているのかというと、1 つのメリットとしては readonly のディレクトリと writable なディレクトリを分けることによって複数台のコンテナを立てた際に使用するリソースを節約できるというものがあります（readonly 部分は共有し、writable な部分は各コンテナに用意できる。）

`br_netfilter` は Linux Bridge を通過するトラフィックに対して netfilter (L3,L4 の制御)を適用可能にするモジュールです。  

Pod は独立したネットワーク namespace を持っていて（ネットワークが分離されていて）、それぞれ `eth0` の仮想 NIC を持っています。  

同一ノード内にある PodA と PodB の通信でもブリッジが必要になるので、ノードにブリッジを作って `eth0(PodA) -> veth -> bridge -> veth -> eth0(PodB)` という通信経路が考えられます。  

しかしこれは L2 の世界の通信で完結するので、K8s の機能であるネットワークポリシーやロードバランシングを機能させられません。

そこで `br_netfilter` を使ってブリッジ内の通信にも netfilter による L3,L4 の制御を適用できるようにします。ようは Kubernetes の要件を実現するために必要な機能です。

次のコマンドはまさに `bridge` 間通信に対して L3/L4 を割り込ませる設定です。  
また、`ip_forward` はノードをルーターとして L3/L4 の通信をフォワードさせる設定です。
```bash
# この構成に必要なカーネルパラメーター、再起動しても値は永続します
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF
```

ドキュメントの続き、コンテナのライフサイクルを管理する `containerd` をインストールします。  
このドキュメントに従います。
https://github.com/containerd/containerd/blob/main/docs/getting-started.md

```bash
dpkg --print-architecture
amd64

releases から amd64 のアーカイブをダウンロード
sudo tar Cxzvf /usr/local containerd-2.2.1-linux-amd64.tar.gz
```

containerd を systemd に登録。
```bash
sudo mkdir -p /usr/local/lib/systemd/system
sudo vim /usr/local/lib/systemd/system/containerd.service
URL 先のファイルの内容を書き込み。

systemctl daemon-reload
systemctl enable --now containerd

```

続いて OCI の実装であり、Linux の機能を使って実際にコンテナを起動する役割の `runc` をインストールします。  

```bash
バイナリのダウンロード…
sudo install -m 755 runc.amd64 /usr/local/sbin/runc
```

CNI プラグインをインストールします。  

CNI とは Container Network Interface で、コンテナのネットワークに関する仕様です。CNI を実装したプラグインをインストールすることで、Kubernetes がネットワークを設定できるようになり、例えば Pod 内のコンテナに IP アドレスを割り当てるなどができるようになります。

```bash
アーカイブをダウンロード…
sudo mkdir -p /opt/cni/bin
sudo tar Cxzvf /opt/cni/bin cni-plugins-linux-amd64-v1.9.0.tgz
```

このあたりはとにかくネットワークの知識が必要ですね。。とにかく基礎が足りていないなと感じます。

続いて、`runc` が `cgroup` を扱うときに `systemd` に作らせる方式になるよう設定します。  

```bash
sudo mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml >/dev/null 2>&1

sudo vi /etc/containerd/config.toml
SystemdCgroup = true # もともと false なので変更する

sudo systemctl restart containerd
```

`cgroup` とはリソースの分離や制限、監視を行う Linux プロセスグループで、このおかげでコンテナに割り当てるリソースを指定（制限）できます。

`cgroup` を扱うため、コンテナランタイムは `cgroup ドライバー` が必要です。  
この `cgroup ドライバー` は `cgroupfs` と `systemd` の 2 つがあります。ここで、`systemd` を init プロセスに使う場合は `cgroup` の管理は `systemd` が行うという前提があるので、その環境でコンテナランタイムの cgroup ドライバーに `cgroupfs` を設定してしまうと支障を来します。

自分の Ubuntu が入ったミニPC は `systemd` が init プロセスなので、コンテナランタイム (runc) の cgroup ドライバーに `systemd` を明示的に設定したのです。

この辺は OS の知識が必要ですね。。基礎がない（2回目）。

### kubeadm を使ったクラスタ構築編
Kubernetes を扱う準備が整ったので、Kubernetes クラスターを立てていきます。  
クラスターを立てるため `kubeadm` をインストールします。

https://kubernetes.io/ja/docs/setup/production-environment/tools/kubeadm/install-kubeadm/

```bash
sudo apt update
sudo apt install -y apt-transport-https ca-certificates curl gpg

curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.35/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.35/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

sudo aptupdate
sudo apt install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

Kubernetes バージョンは 1.35 です。

`kubeadm` を使ってクラスタを立てます。
```bash
sudo kubeadm init

mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

`kubectl` がデフォルトで見る設定ファイルである `.kube/config` に `/etc/kubernetes/admin.conf` の内容をコピーしています。`admin.conf` は kubeadm が作った管理者用の設定ファイルで、`kubectl` にその権限を委譲する形になります。

`Calico` をインストールし、Kubernetes ネットワークを実装できるようにします。

```bash
kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.31.3/manifests/calico.yaml
```

ミニ PC 1 台構成なので untaint します。

```bash
kubectl taint nodes --all node-role.kubernetes.io/control-plane-
```

### ArgoCD を入れる

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

ツールも
```bash
VERSION=$(curl -L -s https://raw.githubusercontent.com/argoproj/argo-cd/stable/VERSION)
curl -sSL -o argocd-linux-amd64 https://github.com/argoproj/argo-cd/releases/download/v$VERSION/argocd-linux-amd64
sudo install -m 555 argocd-linux-amd64 /usr/local/bin/argocd
rm argocd-linux-amd64
```

一時的に接続できるようにします。
```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

パスワードを設定します。

```bash
argocd admin initial-password -n argocd
argocd login localhost:8080

argocd account update-password
<好きなパスワード>
```


### Tailscale Operator を入れる
Pod に自分が Tailscale Tailscale Operator をインストールします。  
こちらの記事を参考にしました。

https://zenn.dev/gaudiy_blog/articles/tailscale-kubernetes-operator

## 終わりに
Kubernetes を何も知らない状態からミニ PC にクラスターを立てました。  
低レイヤー勉強していきたいですね。