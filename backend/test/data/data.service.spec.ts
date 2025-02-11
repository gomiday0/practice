import { Test, TestingModule } from '@nestjs/testing';
import { DataService } from '../../src/data/data.service';
import { PrismaService } from '../../src/prisma.service';
import { extractTypeFromHtml } from '../../src/data/utils'; // utils.ts からインポート

// モックHTML
const mockHTML = `
<table>
  <tbody>
    <tr>
      <td class="title"><a class="text_link" href="#">Test Title 1</a></td>
      <td class="music_seq_box"><span class="seq_icon diff_13"></span></td>
      <td class="achive_cell">98%</td>
      <td class="skill_cell">12.34</td>
      <td class="skill_select"><span class="select_true hot"></span></td>
    </tr>
    <tr>
      <td class="title"><a class="text_link" href="#">Test Title 2</a></td>
      <td class="music_seq_box"><span class="seq_icon diff_15"></span></td>
      <td class="achive_cell">95%</td>
      <td class="skill_cell">13.57</td>
      <td class="skill_select"><span class="select_true"></span></td>
    </tr>
  </tbody>
</table>
`;

describe('DataService', () => {
  let service: DataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataService,
        {
          provide: PrismaService,
          useValue: {
            song: {
              create: jest.fn(),
            },
            $transaction: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DataService>(DataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should extract type from HTML', () => {
    expect(extractTypeFromHtml(mockHTML)).toBe('hot'); // utils.tsの関数をテスト
    expect(
      extractTypeFromHtml(
        `<div class="skill_select"><span class="select_true"></span></div>`,
      ),
    ).toBe('other'); // utils.tsの関数をテスト
  });

  // ... other tests
});
