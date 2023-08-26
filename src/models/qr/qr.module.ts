import { Module } from '@nestjs/common';
import { QrEntity } from './entities/qr.entity';
import { ScanEntity } from './entities/scan.entity';
import { ReportEntity } from '../report/entities/report.entity';
import { QrService } from './qr.service';
import { QrController } from './qr.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([QrEntity, ScanEntity, ReportEntity])],
  providers: [QrService],
  controllers: [QrController],
  exports: [TypeOrmModule, QrService],
})
export class QrModule {}
