import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { parse, HTMLElement } from 'node-html-parser';
import { PrismaService } from '../prisma.service';
import { SongData } from './types/song-data';
import { extractTypeFromHtml } from './utils'; // utils.ts からインポート

@Injectable()
export class DataService {
  constructor(private prisma: PrismaService) {}

  async getData(type: 'old' | 'new'): Promise<SongData[]> {
    const filePath = path.join(__dirname, `../../../../data/${type}.html`);
    const html = fs.readFileSync(filePath, 'utf-8');

    const root = parse(html);
    const tableRows = root.querySelectorAll('.skill_table_tb tbody tr');

    //  utils.ts の関数を使用
    const extractedType = extractTypeFromHtml(html);

    return tableRows.map((row: HTMLElement) => {
      const title =
        row.querySelector('.title .text_link')?.textContent?.trim() || '';
      const difficultyElement = row.querySelector(
        '.music_seq_box .seq_icon:nth-child(2)',
      );

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
        type: extractedType, //  ここで使用
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
