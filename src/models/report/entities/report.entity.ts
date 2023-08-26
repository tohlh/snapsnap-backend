import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Report')
export class ReportEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  qrDetailId: number;

  @Column({ nullable: true })
  reason: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP(6)',
    type: 'timestamp',
  })
  createdAt?: Date;
}
