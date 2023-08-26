import { ReportEntity } from 'src/models/report/entities/report.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ScanEntity } from './scan.entity';

@Entity('Qr')
export class QrEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  type: number; // 0: PayNow, 1: Generic

  @Column({ nullable: false })
  content: string;

  @OneToMany(() => ScanEntity, (scan) => scan.qr, { nullable: false })
  scans: ScanEntity[];

  @OneToMany(() => ReportEntity, (report) => report.qr, { nullable: true })
  reports: ReportEntity[];

  @Column({
    default: () => 'CURRENT_TIMESTAMP(6)',
    type: 'timestamp',
  })
  createdAt?: Date;
}
