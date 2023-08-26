import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Request,
  Param,
  UseGuards,
} from '@nestjs/common';
import { QrService } from './qr.service';
import { JwtAuthGuard } from 'src/auth/user/guard/jwt.guard';

@Controller('qr')
export class QrController {
  constructor(private readonly qrService: QrService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  async addQr(@Request() req) {
    try {
      const user = req.user;
      const { type, content } = req.body;
      return await this.qrService.addQr(type, content, user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/history')
  async getQrHistory(@Request() req) {
    try {
      const user = req.user;
      return await this.qrService.getQrHistory(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/risk_factor/:id')
  async getRiskFactor(@Param() params: any) {
    return await this.qrService.getRiskFactor(params.id);
  }
}
