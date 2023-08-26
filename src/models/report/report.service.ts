import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { ReportEntity } from './entities/report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ReportEntity)
    private reportRepository: Repository<ReportEntity>,
  ) {}

  async findAll(): Promise<ReportEntity[]> {
    return await this.reportRepository.find();
  }

  async findOne(data: number | any): Promise<ReportEntity | undefined> {
    return await this.reportRepository.findOne(data);
  }

  async create(data) {
    return await this.reportRepository.save(data).then((res) => {
      return res;
    });
  }

  async update(
    id: number,
    data: object,
  ): Promise<ReportEntity | UpdateResult | undefined> {
    const user = await this.findOne(id).then((res) => res);
    if (user)
      return await this.reportRepository.update(id, data).then((res) => res);
    return;
  }

  async remove(id: number) {
    return await this.reportRepository.delete(id);
  }

  async getReports(user: UserEntity) {
    return await this.reportRepository.find({ where: { user } });
  }

  async getReport(user: UserEntity, id: number) {
    return await this.reportRepository.findOne({ where: { user, id } });
  }
}
