import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { QrEntity } from './entities/qr.entity';
import { UserEntity } from '../user/entities/user.entity';
import { ScanEntity } from './entities/scan.entity';

@Injectable()
export class QrService {
  constructor(
    @InjectRepository(QrEntity)
    private qrRepository: Repository<QrEntity>,
    @InjectRepository(ScanEntity)
    private scanRepository: Repository<ScanEntity>,
  ) {}

  findAll(): Promise<QrEntity[]> {
    return this.qrRepository.find();
  }

  async findOne(data: number | any): Promise<QrEntity | undefined> {
    return await this.qrRepository.findOne(data);
  }

  async findOneByContent(content: string): Promise<QrEntity | undefined> {
    return this.findOne({ where: { content } });
  }

  async create(data) {
    return await this.qrRepository.save(data).then((res) => {
      return res;
    });
  }

  async update(
    id: number,
    data: object,
  ): Promise<QrEntity | UpdateResult | undefined> {
    const user = await this.findOne(id).then((res) => res);
    if (user)
      return await this.qrRepository.update(id, data).then((res) => res);
    return;
  }

  async remove(id: number) {
    return await this.qrRepository.delete(id);
  }

  async addQr(type: number, content: string, user: UserEntity) {
    return await this.create({ type, content, user });
  }

  async getQrHistory(user: UserEntity) {
    // list the qr codes that the user has scanned
    const scans = await this.scanRepository.find({ where: { user } });
    const qrCodes = scans.map((scan) => scan.qr);
    return qrCodes;
  }

  async getRiskFactor(id: number) {
    const qr = await this.findOne(id);
    if (qr) {
      const scanCount = qr.scans.length;
      const reportCount = qr.reports.length;
      return reportCount / scanCount;
    }
    return 0;
  }
}
