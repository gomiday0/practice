import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super(); // PrismaClient のコンストラクタを呼び出す
  }

  async onModuleInit() {
    await this.$connect(); // アプリケーション起動時にデータベースに接続
  }

  async onModuleDestroy() {
    await this.$disconnect(); // アプリケーション終了時にデータベースから切断
  }
}
