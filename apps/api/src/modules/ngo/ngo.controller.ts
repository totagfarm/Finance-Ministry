import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { NgoService } from './ngo.service';

@Controller('ngo')
export class NgoController {
  constructor(private readonly ngoService: NgoService) {}

  @Get()
  findAll() {
    return this.ngoService.findAll();
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.ngoService.updateStatus(id, status);
  }
}
