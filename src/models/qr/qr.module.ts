import { Module } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { QrEntity } from './entities/qr.entity';
import { ScanEntity } from './entities/scan.entity';
import { QrService } from './qr.service';
import { QrController } from './qr.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, QrEntity, ScanEntity])],
  providers: [QrService],
  controllers: [QrController],
  exports: [TypeOrmModule, QrService],
})
export class QrModule {}
