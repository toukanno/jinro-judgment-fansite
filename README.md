# 人狼ジャッジメント ファンサイト

人狼ジャッジメントの役職情報、立ち回り、初心者向け解説、編成考察をまとめるファンサイトです。

ブラウザ版に加え、Tauri を使った macOS ネイティブアプリとしても利用できます。

## 技術スタック

- **フロントエンド**: React + TypeScript + Vite
- **デスクトップ**: Tauri 2 (macOS / .app / .dmg)
- **ルーティング**: React Router

## 開発

```bash
# 依存関係のインストール
npm install

# Web版の開発サーバー起動
npm run dev

# macOSアプリの開発モード起動
npm run tauri:dev

# macOSアプリのビルド (.app / .dmg)
npm run tauri:build
```

## 必要環境

- Node.js 18+
- macOSアプリのビルドには [Rust](https://www.rust-lang.org/) と Tauri CLI が必要です

```bash
# Rust のインストール
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Tauri CLI は devDependencies に含まれています
```
