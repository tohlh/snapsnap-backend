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
  @Post('/scan')
  async scanQr(@Request() req) {
    try {
      const user = req.user;
      const { type, content } = req.body;
      const id = await this.qrService.scanQr(type, content, user);
      const qr = await this.qrService.getQrDetails(id);
      const risk = await this.qrService.getRiskFactor(id);
      return { id: qr.id, type: qr.type, content: qr.content, risk };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/history')
  async getQrHistory(@Request() req) {
    try {
      const user = req.user;
      const history = await this.qrService.getQrHistory(user);
      return { history };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/details/:id')
  async getQrDetails(@Param() params: any) {
    try {
      const qr = await this.qrService.getQrDetails(params.id);
      const risk = await this.qrService.getRiskFactor(params.id);
      return {
        id: qr.id,
        type: qr.type,
        content: qr.content,
        createdAt: qr.createdAt,
        risk,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
