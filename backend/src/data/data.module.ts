import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { PrismaService } from '../prisma.service'; // 追加

@Module({
  providers: [DataService, PrismaService],
  controllers: [DataController],
})
export class DataModule {}
