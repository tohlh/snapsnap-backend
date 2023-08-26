import { UserEntity } from 'src/models/user/entities/user.entity';
import { QrEntity } from 'src/models/qr/entities/qr.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Report')
export class ReportEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.reports, { nullable: false })
  user: UserEntity;

  @ManyToOne(() => QrEntity, (qr) => qr.reports, { nullable: false })
  qr: QrEntity;

  @Column({ nullable: false })
  type: number;

  @Column({ nullable: true })
  reason: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP(6)',
    type: 'timestamp',
  })
  createdAt?: Date;
}
