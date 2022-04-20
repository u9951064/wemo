import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Scooters')
export class Scooter extends BaseEntity {
  @ApiProperty({
    description: '車牌號碼',
    example: 'ABC-1234',
  })
  @PrimaryColumn('varchar', { length: 8 })
  plate_number: string;

  @ApiProperty({
    description: '車輛里程數 (km)',
    example: '25',
  })
  @Column('int', { unsigned: true, default: 0 })
  mileage: number;

  @ApiProperty({
    description: '車輛GPS位置 (Lat,Long)',
    example: '23.546162,120.640213',
  })
  @Column('varchar', { length: 30 })
  gps_position: string;

  @ApiProperty({
    description: '車輛廠牌',
    example: 'Gogoro',
  })
  @Column('varchar', { length: 25 })
  public manufacture: string;

  @ApiProperty({
    description: '車輛型號',
    example: 'VIVA MIX',
  })
  @Column('varchar', { length: 25 })
  public model: string;

  @ApiProperty({
    description: '行照號碼',
    example: '03板1234567890',
  })
  @Column('varchar', { length: 25 })
  public license_number: string;

  @ApiProperty({
    description: '行照發照日期',
    example: '2020-01-01',
  })
  @Column('timestamp')
  public license_published_at: Date;

  @ApiProperty({
    description: '出廠年份',
    example: '2020',
  })
  @Column('int', { unsigned: true })
  public manufacturing_year: number;

  @ApiProperty({
    description: '車輛狀態 (1:等待中, 2:出借中, -1:故障, -2:報廢, -3:錯誤 )',
    example: 1,
  })
  @Column({ default: 1 })
  status: number;

  @ApiProperty({
    description: '資料建立時間',
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    description: '資料最後更新時間',
  })
  @UpdateDateColumn()
  updated_at: Date;
}
