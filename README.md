# 🌡️ 世界の気温アプリ

Next.js 14 + microCMS + Open-Meteo を使った、インタラクティブな気温情報表示アプリケーション

## ✨ 新機能一覧

### 🎨 背景のランダム変更
- ページをリロードするたびに異なるグラデーション背景に変更
- 15種類以上のカラフルなグラデーション
- ダークモード時は別のダークグラデーション適用
- ボタンでいつでも背景を変更可能

### 🌙 ダークモード対応
- ☀️/🌙 ボタンで簡単切り替え
- LocalStorage に保存して自動復元
- ダークモード時に背景も自動調整

### 🔍 検索/フィルター機能
- 都市名で検索
- 気温範囲（最低気温～最高気温）でフィルター
- リアルタイム検索結果表示
- 検索結果の都市数表示

### 📊 気温ランキング表示
- 最高気温の都市を表示
- 最低気温の都市を表示
- 全都市の平均気温を計算

### ⭐ お気に入り機能
- 各カードの☆ボタンで都市をお気に入り登録
- ⭐マークに変化してハイライト
- LocalStorage で永続保存

### 🚨 天気アラート機能
- 各都市ごとに最高気温と最低気温の閾値を設定
- 超過時には🚨マークに変化
- モーダルで簡単設定
- ブラウザ通知機能対応

### 🎯 UI/UX の大幅改善
- ガラスモーフィズム（Glassmorphism）デザイン
- スムーズなアニメーション
- ホバーエフェクト
- レスポンシブデザイン完全対応

## 📋 基本機能

- 世界各国の都市の気温情報をリアルタイム表示
- 気温に応じた色分け表示（赤/オレンジ/緑/青/紫）
- 詳細ページで週間予報、日の出・日の入り時刻を表示
- レスポンシブデザイン対応
- ISR（Incremental Static Regeneration）による自動更新

## 🚀 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: CSS Modules + ガラスモーフィズム
- **状態管理**: React Context API
- **ストレージ**: LocalStorage
- **CMS**: microCMS
- **天気API**: Open-Meteo
- **デプロイ**: Vercel

## 📦 セットアップ

### 1. リポジトリのクローン

```bash
git clone <your-repo-url>
cd temperature-app
```

### 2. パッケージのインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env.local` ファイルを作成し、以下を設定:

```env
MICROCMS_SERVICE_DOMAIN=your_service_domain
MICROCMS_API_KEY=your_api_key
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開く

### 5. ビルドとデプロイ

```bash
# 本番ビルド
npm run build

# 本番サーバー起動
npm start
```

## 🎯 使用方法

### 基本的な操作

1. **背景変更**: 🎨 ボタンをクリック
2. **ダークモード**: ☀️/🌙 ボタンをクリック
3. **検索**: 検索ボックスに都市名を入力
4. **フィルター**: 🔍 ボタンで気温範囲を指定
5. **お気に入り**: ☆ ボタンをクリック → ⭐ に変化
6. **アラート設定**: 🔔 ボタンをクリックして最高/最低気温を設定

## 📊 新規作成ファイル

```
lib/
  ├── gradients.ts (背景グラデーション管理)
  └── contexts.tsx (Theme, Favorites, Alerts Context)

components/
  ├── ThemeToggle.tsx + .module.css (ダークモード切り替え)
  ├── BackgroundRefresh.tsx + .module.css (背景リロード)
  ├── SearchBar.tsx + .module.css (検索/フィルター)
  ├── TemperatureRanking.tsx + .module.css (ランキング)
  ├── FavoriteButton.tsx + .module.css (お気に入り)
  ├── AlertSettings.tsx + .module.css (アラート設定)
  ├── ClientSearchBar.tsx + .module.css (クライアント検索)
  ├── HomeClient.tsx (ホームページ統合)
  └── BackgroundInitializer.tsx (背景初期化)
```

## 🗂️ プロジェクト構造

```
app/
├── page.tsx
├── layout.tsx
├── globals.css
└── temperature/
    └── [id]/
        └── page.tsx

components/
├── HomeClient.tsx
├── Header.tsx
├── TemperatureCard.tsx
├── TemperatureDetail.tsx
├── TemperatureRanking.tsx
├── SearchBar.tsx
├── ClientSearchBar.tsx
├── ThemeToggle.tsx
├── BackgroundRefresh.tsx
├── FavoriteButton.tsx
├── AlertSettings.tsx
├── BackgroundInitializer.tsx
├── LoadingSpinner.tsx
└── IconComponents.tsx

lib/
├── microcms.ts
├── openMeteo.ts
├── contexts.tsx
└── gradients.ts

types/
└── temperature.ts

public/
└── [static assets]
```

## 🎨 色分けルール

気温に応じた色分け:

| 気温 | 色 | コード |
|------|-----|---------|
| 30°C以上 | 赤 | #ff6b6b |
| 20-30°C | オレンジ | #ffa500 |
| 10-20°C | 緑 | #51cf66 |
| 0-10°C | 青 | #339af0 |
| 0°C以下 | 紫 | #9775fa |

## 📝 ライセンス

MIT

## 🤝 Contributing

プルリクエストを大歓迎します！

## 📧 サポート

問題が発生した場合は、GitHub Issues で報告してください。

---

**Last Updated**: 2025年11月26日  
**Version**: 2.0 (All Features) ✨
