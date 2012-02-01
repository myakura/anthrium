URLの邪魔なクエリーをとるスクリプト
===================================

「?utm_source」とか妙なものがついてて邪魔なので、それを取りたい。
いまは誰かのユーザースクリプトを使ってるけど、自分で書いてみたい。

スクリプトは何をする？
----------------------

1. <a>のURLが変わってたら書きかえる
2. 移動したページのURLについてたらとる

1の考えられる問題は2つ
ページ内のリンクを結構な数なめちゃうので、パフォーマンスに影響があるかも
t.coとかリダイレクト系のURLに対応できない気がする

ただ、クエリー付きのにアクセスすることがないので、できればやっておきたい。
とりあえず2をやりたい。

スクリプトはどう動くか
----------------------

1. ページのURLを取得する
2. URLに特定のクエリ（?utm_source=, ?ref=gp_top, ?ref=rssなど）が入ってるかを検出
3. あったら削除する

以下メモ。

* 特定のクエリをどう判別するか。
    * その後ろ全部消すような乱暴な感じでよいか。
* ?と&にどう対応するか。
    * これは正規表現でよさそうだけど。
* ハッシュが入ってた場合どうなるか。
    * あんまり考えなくてもいい気はするけど。。
    * location.searchで取るならハッシュは関係ないかな。
* 削除、は何を意味するか。
    * 移動せずに書き換えられるならすばらしい。
        * taberarelooとかに渡すときもそれが変わってて欲しい。
    * history.replaceStateでなんとかなる？

邪魔クエリ一例
--------------

    utm_source=
    ref=gp_top, ref=rss, ref=info_product
    feature=related, feature=list-related, feature=fvwrel, feature=context
    feature=g-all-pls&context=, feature=g-all-esi&context, feature=g-vrec&context=, feature=context&context=

    from=rss

    ?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+readwriteweb+%28ReadWriteWeb%29&utm_content=Google+Reader
    &feature=player_embedded
