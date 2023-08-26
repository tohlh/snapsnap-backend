import { Module } from '@nestjs/common';
import { ReportEntity } from './entities/report.entity';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ReportEntity])],
  providers: [ReportService],
  controllers: [ReportController],
  exports: [TypeOrmModule, ReportService],
})
export class ReportModule {}
