# Repository Review (2026-03-15)

対象: `toukanno/werewolf-judgment-ai-web` 相当の現作業ツリー（`/workspace/jinro-judgment-fansite`）

## 実施内容

- 静的確認: 主要設定 (`package.json`, `vite.config.ts`), 共通JS (`js/common.js`), Service Worker (`sw.js`, `public/sw.js`)。
- コマンド確認:
  - `npm run lint`
  - `npm run build`

## 良い点

1. **マルチページ構成が明確**
   - `vite.config.ts` の `rollupOptions.input` に主要ページが明示されており、公開ページ構成を追いやすい。
2. **PWA対応の基本が実装済み**
   - `js/common.js` で Service Worker 登録を実施し、`sw.js` 側で install/activate/fetch の基本フローを備えている。
3. **ビルドが成功する状態を維持**
   - `npm run build` は成功し、配布物生成まで到達する。

## 指摘事項（優先度順）

### 1) [Medium] 非moduleスクリプトがViteバンドル対象外になっている

- 現状、各HTMLで読み込む `js/theme.js` / `js/common.js` / `js/roles-data.js` は `type="module"` ではないため、
  `npm run build` 時に「can't be bundled without type="module" attribute」警告が多数発生する。
- 影響:
  - JS最適化（バンドル/ハッシュ管理）に乗らず、キャッシュ制御や依存解決がページごとに不安定化しやすい。
  - 警告ノイズで、本当に重要なビルド異常を見落としやすい。
- 推奨:
  - 段階的に `type="module"` 化するか、Vite管理外資産として方針を明文化（`README` など）して警告を許容する理由を残す。

### 2) [Medium] Service Worker が2箇所に存在し、内容が分岐している

- `sw.js` と `public/sw.js` の内容が一致しておらず、キャッシュ対象ファイルにも差異がある。
- さらに `js/common.js` は `navigator.serviceWorker.register('sw.js')` を呼ぶため、実運用でどちらが正本か判断しづらい。
- 影響:
  - 修正漏れによるキャッシュ不整合、オフライン挙動の予期せぬ差分。
- 推奨:
  - 正本を1つに統一し、もう片方は削除または生成物として自動同期。

### 3) [Low] Lint warning が恒常的に残っている

- `npm run lint` は成功するが、`js/common.js` の `showToast` 未使用、`js/roles-data.js` の未使用定数で warning が残る。
- 影響:
  - CI/ローカル実行時のシグナル品質低下（新規warningを見落としやすい）。
- 推奨:
  - 本当に未使用なら削除。
  - グローバル参照前提なら ESLint 設定でスコープ限定の例外を明示。

### 4) [Low] 画像サイズの大きいアセットが存在

- ビルド出力上、`IMG_0953.PNG` が約3.9MB と大きい。
- 影響:
  - 初回読み込み性能、モバイル通信量に悪影響。
- 推奨:
  - WebP/AVIF化、解像度別の配信、遅延読み込みの徹底。

## 総評

- **機能面は成立しており、ビルドも通る** 一方で、
  「Vite運用（module化）」「SW正本統一」「警告ゼロ運用」の3点を整えると、保守性とデプロイ安全性が大きく向上する。
