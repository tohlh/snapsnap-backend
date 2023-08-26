import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { QrEntity } from './entities/qr.entity';

@Injectable()
export class QrService {
  constructor(
    @InjectRepository(QrEntity)
    private qrRepository: Repository<QrEntity>,
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
}
