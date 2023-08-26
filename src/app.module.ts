import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { UserAuthModule } from './auth/user/user.auth.module';
import { UserModule } from './models/user/user.module';
import { QrModule } from './models/qr/qr.module';
import { ReportModule } from './models/report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfig,
    }),
    UserAuthModule,
    UserModule,
    QrModule,
    ReportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
