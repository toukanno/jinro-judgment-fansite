# jinro-judgment-fansite

人狼ジャッジメントの役職情報、立ち回り、初心者向け解説、編成考察をまとめるファンサイトです。

## iOS / モバイル対応

- iOS Safari「ホーム画面に追加」でアプリライクに動作（PWA）
- `apple-mobile-web-app-capable` によるフルスクリーン表示
- `viewport-fit=cover` + `safe-area-inset` でノッチ・Dynamic Island対応
- Apple Touch Icon によるホーム画面アイコン
- Service Worker によるオフラインキャッシュ
- モバイルファーストのレスポンシブデザイン

## セットアップ

任意のWebサーバーで配信してください。

```bash
# 例: Python簡易サーバー
python3 -m http.server 8000
```

`icons/` ディレクトリに適切なサイズのアイコン画像を配置してください（詳細は `icons/README.md` を参照）。
