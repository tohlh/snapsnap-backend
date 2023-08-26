import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(data: number | any): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne(data);
  }

  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    return this.findOne({ where: { email } });
  }

  async create(data) {
    return await this.userRepository.save(data).then((res) => {
      res.passwordDigest = undefined;
      return res;
    });
  }

  async update(
    id: number,
    data: object,
  ): Promise<UserEntity | UpdateResult | undefined> {
    const user = await this.findOne(id).then((res) => res);
    if (user)
      return await this.userRepository.update(id, data).then((res) => res);
    return;
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
