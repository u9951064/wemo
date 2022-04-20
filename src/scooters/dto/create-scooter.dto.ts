import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsLatLong,
  IsIn,
  IsDateString,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ScooterStatus } from 'src/constants/scooterStatus';

export class CreateScooterDto {
  @ApiProperty({
    maxLength: 8,
    description: '車牌號碼',
    example: 'ABC-1234',
  })
  @IsString()
  @MaxLength(8)
  @IsNotEmpty()
  public plate_number: string;

  @ApiProperty({
    description: '車輛里程數 (km)',
    example: '25',
  })
  @IsNotEmpty()
  @IsNumber()
  public mileage: number;

  @ApiProperty({
    description: '車輛GPS位置 (Lat,Long)',
    example: '23.546162,120.640213',
  })
  @IsNotEmpty()
  @MaxLength(30)
  @IsLatLong()
  public gps_position: string;

  @ApiProperty({
    description: '車輛廠牌',
    example: 'Gogoro',
  })
  @IsNotEmpty()
  @MaxLength(25)
  public manufacture: string;

  @ApiProperty({
    description: '車輛型號',
    example: 'VIVA MIX',
  })
  @IsNotEmpty()
  @MaxLength(25)
  public model: string;

  @ApiProperty({
    description: '行照號碼',
    example: '03板1234567890',
  })
  @IsNotEmpty()
  @MaxLength(25)
  public license_number: string;

  @ApiProperty({
    description: '行照發照日期',
    example: '2020-01-01',
  })
  @IsNotEmpty()
  @IsDateString()
  public license_published_at: Date;

  @ApiProperty({
    description: '出廠年份',
    example: '2020',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(2020)
  public manufacturing_year: number;

  @ApiProperty({
    description: '車輛狀態 (1:等待中, 2:出借中, -1:故障, -2:報廢, -3:錯誤 )',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsIn(Object.values(ScooterStatus))
  public status: number;
}
