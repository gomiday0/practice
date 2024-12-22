import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Check API Server Health' })
  @ApiResponse({ status: 200, description: 'API Server is healthy' })
  getHello(): string {
    return this.appService.getHello();
  }
}
