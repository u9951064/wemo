import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity('Scooters')
export class Scooter extends BaseEntity {
  @PrimaryColumn('varchar', { length: 8 })
  plate_number: string;

  @Column('int', { unsigned: true, default: 0 })
  mileage: number;

  @Column('varchar', { length: 30 })
  gps_position: string;

  @Column('varchar', { length: 25 })
  public manufacture: string;

  @Column('varchar', { length: 25 })
  public model: string;

  @Column('varchar', { length: 25 })
  public license_number: string;

  @Column('timestamp')
  public license_published_at: Date;

  @Column('int', { unsigned: true })
  public manufacturing_year: number;

  @Column({ default: 1 })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
