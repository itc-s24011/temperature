# 🌡️ 世界の気温アプリ

Next.js + microCMS を使った気温情報表示アプリケーション

## 📋 機能

- 世界各国の都市の気温情報を表示
- 気温に応じた色分け表示
- 詳細ページで週間予報、日の出・日の入り時刻などを表示
- レスポンシブデザイン対応
- ISR（Incremental Static Regeneration）による自動更新

## 🚀 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: CSS Modules
- **CMS**: microCMS
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

### 4. microCMS の設定

1. microCMS でアカウント作成
2. 新しいサービスを作成
3. API を作成（エンドポイント: `temperature`）
4. 以下のフィールドを設定:

| フィールド ID      | 表示名       | 種類               |
| ------------------ | ------------ | ------------------ |
| city               | 都市名       | テキスト           |
| country            | 国名         | テキスト           |
| currentTemperature | 現在の気温   | 数値               |
| feelsLike          | 体感温度     | 数値               |
| high               | 最高気温     | 数値               |
| low                | 最低気温     | 数値               |
| humidity           | 湿度         | 数値               |
| pressure           | 気圧         | 数値               |
| sunrise            | 日の出       | テキスト           |
| sunset             | 日の入り     | テキスト           |
| timezone           | タイムゾーン | テキスト           |
| weeklyData         | 週間データ   | 複数コンテンツ参照 |

**weeklyData の子フィールド:**

| フィールド ID | 表示名   | 種類     |
| ------------- | -------- | -------- |
| date          | 日付     | テキスト |
| high          | 最高気温 | 数値     |
| low           | 最低気温 | 数値     |
| precipitation | 降水確率 | 数値     |

### 5. サンプルデータの追加

microCMS に以下のようなサンプルデータを追加:

```json
{
  "city": "東京",
  "country": "日本",
  "currentTemperature": 25,
  "feelsLike": 27,
  "high": 28,
  "low": 20,
  "humidity": 65,
  "pressure": 1013,
  "sunrise": "05:30",
  "sunset": "18:45",
  "timezone": "JST (UTC+9)",
  "weeklyData": [
    {
      "date": "月",
      "high": 28,
      "low": 20,
      "precipitation": 10
    },
    {
      "date": "火",
      "high": 27,
      "low": 19,
      "precipitation": 20
    }
  ]
}
```

### 6. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開く

### 7. ビルドとデプロイ

```bash
# ビルド
npm run build

# 本番サーバー起動
npm start
```

## 🌐 Vercel へのデプロイ

1. GitHub にプッシュ
2. Vercel アカウントにログイン
3. 「New Project」をクリック
4. GitHub リポジトリを選択
5. 環境変数を設定:
   - `MICROCMS_SERVICE_DOMAIN`
   - `MICROCMS_API_KEY`
6. 「Deploy」をクリック

## 📁 ディレクトリ構造

```
temperature-app/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── page.module.css
│   └── temperature/
│       └── [id]/
│           ├── page.tsx
│           └── page.module.css
├── components/
│   ├── Header.tsx
│   ├── Header.module.css
│   ├── TemperatureCard.tsx
│   ├── TemperatureCard.module.css
│   ├── TemperatureDetail.tsx
│   ├── TemperatureDetail.module.css
│   ├── IconComponents.tsx
│   ├── LoadingSpinner.tsx
│   └── LoadingSpinner.module.css
├── lib/
│   └── microcms.ts
├── types/
│   └── temperature.ts
├── .env.local
├── package.json
├── tsconfig.json
└── next.config.js
```

## 🎨 デザインの特徴

- 紫からピンクへのグラデーション背景
- ガラスモーフィズム（Glassmorphism）デザイン
- 気温に応じた色分け:
  - 🔴 30°C 以上: 赤
  - 🟠 20-30°C: オレンジ
  - 🟢 10-20°C: 緑
  - 🔵 0-10°C: 青
  - 🟣 0°C 未満: 紫
- ホバーアニメーション
- レスポンシブ対応

## 📝 ライセンス

MIT

## 👤 作成者

[itc-s24011]

```

---

## 🎉 完成！全ファイル一覧
```

✅ .env.local
✅ types/temperature.ts
✅ lib/microcms.ts
✅ app/globals.css
✅ app/layout.tsx
✅ app/page.tsx
✅ app/page.module.css
✅ app/temperature/[id]/page.tsx
✅ app/temperature/[id]/page.module.css
✅ components/Header.tsx
✅ components/Header.module.css
✅ components/IconComponents.tsx
✅ components/LoadingSpinner.tsx
✅ components/LoadingSpinner.module.css
✅ components/TemperatureCard.tsx
✅ components/TemperatureCard.module.css
✅ components/TemperatureDetail.tsx
✅ components/TemperatureDetail.module.css
✅ package.json
✅ tsconfig.json
✅ next.config.js
✅ .gitignore
✅ README.md
