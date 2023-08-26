import { Module } from '@nestjs/common';
import { ReportEntity } from './entities/report.entity';
import { QrEntity } from '../qr/entities/qr.entity';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ReportEntity, QrEntity])],
  providers: [ReportService],
  controllers: [ReportController],
  exports: [TypeOrmModule, ReportService],
})
export class ReportModule {}
