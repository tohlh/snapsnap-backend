import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Qr')
export class QrEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  type: number; // 0: PayNow, 1: Generic

  @Column({ nullable: false })
  content: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP(6)',
    type: 'timestamp',
  })
  createdAt?: Date;
}
