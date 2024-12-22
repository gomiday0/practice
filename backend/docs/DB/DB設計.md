# データベース設計書

## Entity

### Video
属性名        データ型    説明
id            UUID        主キー
title         String      動画のタイトル
url           String      URL
thumbnailUrl  String      サムネイルのURL
duration      Int         長さ
description　 String      動画の説明(Nullable)
uploadedAt    DateTime    アップロード日時
category      String      カテゴリ
userId        String      ユーザID

### Category
属性名        データ型    説明
id            UUID         主キー
name          String      カテゴリ名
description　 String      動画の説明(Nullable)

### User
属性名	データ型	説明
id	String	主キー, UUID（自動生成）
username	String	ユーザー名, 一意
email	String	メールアドレス, 一意
password	String	パスワード
videos	Video[]	このユーザーがアップロードした動画のリスト（Video モデルとのリレーション）