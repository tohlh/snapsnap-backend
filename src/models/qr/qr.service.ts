import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { QrEntity } from './entities/qr.entity';
import { UserEntity } from '../user/entities/user.entity';
import { ScanEntity } from './entities/scan.entity';
import { ReportEntity } from '../report/entities/report.entity';

@Injectable()
export class QrService {
  constructor(
    @InjectRepository(QrEntity)
    private qrRepository: Repository<QrEntity>,
    @InjectRepository(ScanEntity)
    private scanRepository: Repository<ScanEntity>,
    @InjectRepository(ReportEntity)
    private reportRepository: Repository<ReportEntity>,
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

  async scanQr(type: number, content: string, user: UserEntity) {
    const qr = await this.findOne({ where: { content, type } });
    if (qr) {
      await this.scanRepository.save({ qr, user });
      return qr.id;
    } else {
      const newQr = await this.create({ type, content, user });
      await this.scanRepository.save({ qr: newQr, user });
      return newQr.id;
    }
  }

  async getQrHistory(user: UserEntity) {
    const scans = await this.scanRepository.find({
      relations: ['qr'],
      where: { user: { id: user.id } },
    });
    const qrCodes = scans.map((scan) =>
      Object({
        id: scan.qr.id,
        type: scan.qr.type,
        content: scan.qr.content,
      }),
    );
    return qrCodes;
  }

  async getQrDetails(id: number) {
    const qr = await this.findOne({ where: { id } });
    if (qr) {
      return { id: qr.id, type: qr.type, content: qr.content };
    }
    throw new Error('QR code not found');
  }

  async getRiskFactor(id: number) {
    const qr = await this.findOne({ where: { id } });
    if (qr) {
      const scanCount = await this.scanRepository
        .find({
          relations: ['qr'],
          where: { qr: { id } },
        })
        .then((res) => res.length);
      const reportCount = await this.reportRepository
        .find({
          relations: ['qr'],
          where: { qr: { id } },
        })
        .then((res) => res.length);

      return reportCount / scanCount;
    }
    return 0;
  }
}
