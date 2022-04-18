import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Scooter {
  @PrimaryColumn('varchar', { length: 8 })
  plate_number: string;

  @Column('int', { unsigned: true, default: 0 })
  mileage: number;

  @PrimaryColumn('varchar', { length: 20 })
  gps_position: string;

  @Column({ default: 1 })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
