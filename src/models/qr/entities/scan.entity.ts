import { UserEntity } from 'src/models/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { QrEntity } from './qr.entity';

@Entity('Scan')
export class ScanEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.scans, { nullable: false })
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => QrEntity, (qr) => qr.scans, { nullable: false })
  @JoinColumn()
  qr: QrEntity;

  @Column({
    default: () => 'CURRENT_TIMESTAMP(6)',
    type: 'timestamp',
  })
  createdAt?: Date;
}
