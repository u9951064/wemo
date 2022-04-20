import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

@Entity('Users')
export class User extends BaseEntity {
  @ApiProperty({
    description: '使用者ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '使用者帳號',
    example: 'login_name',
  })
  @Column('varchar', { length: 20 })
  username: string;

  @ApiHideProperty()
  @Column('varchar', { length: 128 })
  password: string;

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
