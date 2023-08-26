import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Request,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { JwtAuthGuard } from 'src/auth/user/guard/jwt.guard';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async create(@Param() params: any, @Request() req) {
    try {
      const user = req.user;
      const { type, reason } = req.body;
      const qr = await this.reportService.getQr(params.id);
      await this.reportService.createReport(user, type, reason, qr);
      return { message: 'Report created successfully' };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getReports(@Request() req) {
    const user = req.user;
    return await this.reportService.getReports(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getReport(@Param() params: any, @Request() req) {
    const user = req.user;
    return await this.reportService.getReport(user, params.id);
  }
}
