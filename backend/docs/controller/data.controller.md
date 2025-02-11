# 楽曲データ API 設計書

## 1. 概要

このAPIは、NestJSフレームワークで構築された、楽曲データ取得・処理を行うためのバックエンドAPIです。

## 2. 技術スタック

- **フレームワーク:** NestJS
- **言語:** TypeScript
- **パッケージマネージャー:** pnpm
- **データベース:** (Prismaのディレクトリがあることから) Prisma (ORM) を使用している可能性が高い。
- **その他:**
  - `@nestjs/config`: 環境変数管理
  - `@nestjs/swagger`: OpenAPI (Swagger) ドキュメント生成
  - `rxjs`: リアクティブプログラミング
  - `reflect-metadata`: リフレクション
  - `eslint`, `prettier`: コード品質、フォーマット
  - `jest`, `supertest`: テスト

## 3. ディレクトリ構造

backend/
├── dist/ # ビルド成果物
├── docs/ # (ドキュメント関連、存在しない可能性あり)
├── node_modules/ # 依存関係パッケージ
├── prisma/ # Prisma関連ファイル (スキーマなど)
├── src/ # ソースコード
│ └── data/ # data Controller, Service, typesなどがあると思われる。
│ ├── data.controller.ts # 今回提供されたコントローラー
│ ├── data.service.ts # (おそらく存在する) データ処理ロジック
│ └── types/
│ └── song-data.ts # (おそらく存在する) 楽曲データの型定義
├── test/ # テストコード
├── .env # 環境変数
├── .eslintrc.js # ESLint 設定
├── .gitignore # Git で無視するファイル
├── .prettierrc # Prettier 設定
├── nest-cli.json # Nest CLI 設定
├── package-lock.json # (npm使用時に生成。pnpmの場合は不要)
├── package.json # プロジェクト設定 (依存関係, スクリプトなど)
├── pnpm-lock.yaml # pnpm ロックファイル
├── README.md # プロジェクト説明
├── tsconfig.build.json # TypeScript ビルド設定
└── tsconfig.json # TypeScript 設定

## 4. API エンドポイント

### 4.1. 楽曲データ取得 (GET /data/:type)

- **概要:** 指定された種別 (`old` または `new`) の楽曲データを取得します。
- **パス:** `/data/:type`
- **メソッド:** `GET`
- **パラメータ:**
  - `:type`: 楽曲データの種別 (`old` または `new`)
- **レスポンス (成功時: 200 OK):**

  - **型:** `SongData[]` ( `SongData` オブジェクトの配列)
  - **例:** ( `SongData` の定義が不明なため、仮の例)

  ```json
  [
    {
      "id": 1,
      "title": "Song Title 1",
      "artist": "Artist Name 1",
      "type": "old"
    },
    {
      "id": 2,
      "title": "Song Title 2",
      "artist": "Artist Name 2",
      "type": "new"
    }
  ]
  ```

- **レスポンス (エラー時: 500 Internal Server Error):**
  - サーバー内部エラー

### 4.2. 楽曲データ処理 (POST /data/:type)

- **概要:** 指定された種別 (`old` または `new`) の楽曲データを処理します。具体的な処理内容は不明。
- **パス:** `/data/:type`
- **メソッド:** `POST`
- **パラメータ:**
  - `:type`: 楽曲データの種別 (`old` または `new`)
- **レスポンス (成功時: 201 Created):**
  - 特に返却値なし (void)
- **レスポンス (エラー時: 500 Internal Server Error):**
  - サーバー内部エラー

## 5. `DataController` (data.controller.ts)

```typescript
import {
  Controller,
  Get,
  Post,
  Param,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataService } from './data.service';
import { SongData } from './types/song-data';
import {
  ApiOperation,
  ApiResponse,
  getSchemaPath,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get(':type')
  @ApiOperation({ summary: 'Get song data' })
  @ApiOkResponse({
    // @ApiResponse から変更
    description: 'The song data has been successfully retrieved.',
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(SongData),
      },
    },
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async getData(@Param('type') type: 'old' | 'new'): Promise<SongData[]> {
    try {
      return await this.dataService.getData(type);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  @Post(':type')
  @ApiOperation({ summary: 'Process song data' })
  @ApiResponse({
    status: 201,
    description: 'The song data has been successfully processed.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async processData(@Param('type') type: 'old' | 'new'): Promise<void> {
    try {
      await this.dataService.processData(type);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
```
