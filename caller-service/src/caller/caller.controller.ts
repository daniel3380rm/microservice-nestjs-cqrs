import { Controller, Post } from '@nestjs/common';
import { CallerService } from './caller.service';

@Controller('caller')
export class CallerController {
  constructor(private readonly callerService: CallerService) {}

  @Post('trigger')
  async triggerRequests() {
    await this.callerService.handleCron();
    return { message: 'Requests triggered' };
  }
}