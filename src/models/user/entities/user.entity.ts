import { ReportEntity } from 'src/models/report/entities/report.entity';
import { ScanEntity } from 'src/models/qr/entities/scan.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  passwordDigest: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP(6)',
    type: 'timestamp',
  })
  createdAt?: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    type: 'timestamp',
  })
  updatedAt?: Date;

  @OneToMany(() => ReportEntity, (report) => report.user)
  reports: ReportEntity[];

  @OneToMany(() => ScanEntity, (scan) => scan.user)
  scans: ScanEntity[];
}
