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
