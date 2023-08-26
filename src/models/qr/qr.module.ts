import { Module } from '@nestjs/common';
import { QrEntity } from './entities/qr.entity';
import { QrService } from './qr.service';
import { QrController } from './qr.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([QrEntity])],
  providers: [QrService],
  controllers: [QrController],
  exports: [TypeOrmModule, QrService],
})
export class UserModule {}
