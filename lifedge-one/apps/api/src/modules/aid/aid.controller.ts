import { Controller, Get, Query } from '@nestjs/common';
import { AidService } from './aid.service';

@Controller('aid')
export class AidController {
  constructor(private readonly aidService: AidService) {}

  @Get('activities')
  getActivities(@Query('donor') donor?: string) {
    return this.aidService.findActivities(donor);
  }

  @Get('analytics/donor-yield')
  getDonorYield() {
    return this.aidService.getDonorYield();
  }
}
