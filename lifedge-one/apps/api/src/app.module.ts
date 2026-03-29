import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { NgoModule } from './modules/ngo/ngo.module';
import { AidModule } from './modules/aid/aid.module';
import { WarehouseModule } from './modules/warehouse/warehouse.module';

@Module({
  imports: [PrismaModule, ProjectsModule, NgoModule, AidModule, WarehouseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
