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
  @Post()
  async create(@Request() req) {
    try {
      return await this.reportService.create(req);
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
