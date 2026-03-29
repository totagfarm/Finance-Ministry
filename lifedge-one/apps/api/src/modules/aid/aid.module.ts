import { Module } from '@nestjs/common';
import { AidController } from './aid.controller';
import { AidService } from './aid.service';

@Module({
  controllers: [AidController],
  providers: [AidService],
  exports: [AidService],
})
export class AidModule {}
