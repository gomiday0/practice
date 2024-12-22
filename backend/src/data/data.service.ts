import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { parse, HTMLElement } from 'node-html-parser'; // HTMLElementを追加
import { PrismaService } from '../prisma.service';
import { SongData } from './types/song-data';

@Injectable()
export class DataService {
  constructor(private prisma: PrismaService) {}

  private extractTypeFromHTML(html: string): string {
    const root = parse(html);
    const selectedType = root.querySelector('.skill_select .select_true');
    return selectedType?.classNames.includes('hot') ? 'hot' : 'other';
  }

  async getData(type: 'old' | 'new'): Promise<SongData[]> {
    const filePath = path.join(__dirname, `../../../../data/${type}.html`);
    console.log('filePath:', filePath); // ファイルパスを確認

    const html = fs.readFileSync(filePath, 'utf-8');
    console.log('html:', html); // HTML が読み込めているか確認

    const root = parse(html);
    console.log('root:', root); // パース結果を確認

    const tableRows = root.querySelectorAll('.skill_table_tb tbody tr');
    console.log('tableRows:', tableRows); // 行が取得できているか確認

    const extractedType = this.extractTypeFromHTML(html);
    console.log('extractedType:', extractedType); // タイプが取得できているか確認

    return tableRows.map((row: HTMLElement) => {
      // 型注釈を追加
      const title =
        row.querySelector('.title .text_link')?.textContent?.trim() || '';
      const difficultyElement = row.querySelector(
        '.music_seq_box .seq_icon:nth-child(2)',
      );

      // difficultyClassは文字列であり、splitとfindを使って書き直す
      const difficultyClass = difficultyElement?.classNames
        .split(' ')
        .find((className: string) => className.startsWith('diff_'));

      const difficulty = difficultyClass
        ? difficultyClass.replace('diff_', '')
        : '';
      const achievementRate =
        row.querySelector('.achive_cell')?.textContent?.trim() || '';
      const skill = row.querySelector('.skill_cell')?.textContent?.trim() || '';

      return {
        title,
        difficulty,
        achievementRate,
        skill,
        type: extractedType,
      };
    });
  }

  async processData(type: 'old' | 'new'): Promise<void> {
    const songsData = await this.getData(type);
    await this.prisma.$transaction(
      songsData.map((data) =>
        this.prisma.song.create({
          data: {
            title: data.title,
            difficulty: data.difficulty,
            achievementRate: data.achievementRate,
            skill: data.skill,
            type: data.type,
          },
        }),
      ),
    );
  }
}
