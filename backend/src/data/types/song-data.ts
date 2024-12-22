import { ApiProperty } from '@nestjs/swagger';

export class SongData {
  @ApiProperty()
  title: string;

  @ApiProperty()
  difficulty: string;

  @ApiProperty()
  achievementRate: string;

  @ApiProperty()
  skill: string;

  @ApiProperty()
  type: string;
}
