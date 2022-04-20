import { ApiProperty } from '@nestjs/swagger';
import { Scooter } from '../entities/scooter.entity';

export class ScootersPaginationDto {
  @ApiProperty({
    description: '資料起始範圍',
    example: 1,
  })
  from?: number;

  @ApiProperty({
    description: '資料結束範圍',
    example: 10,
  })
  to: number;

  @ApiProperty({
    description: '每頁顯示數量',
    example: 15,
  })
  per_page: number;

  @ApiProperty({
    description: '資料總數量',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: '目前頁數',
    example: 2,
  })
  current_page: number;

  @ApiProperty({
    description: '上一頁頁數',
    example: 1,
  })
  prev_page?: number;

  @ApiProperty({
    description: '下一頁頁數',
    example: 3,
  })
  next_page?: number;

  @ApiProperty({
    description: '最後一頁頁數',
    example: 7,
  })
  last_page: number;

  @ApiProperty({
    description: '資料內容',
    type: [Scooter],
  })
  records: Scooter[];
}
