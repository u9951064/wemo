import {
  IsOptional,
  IsNumberString,
  IsString,
  IsIn,
  IsNotEmpty,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ScooterStatus } from 'src/constants/scooterStatus';

export class SearchScooterDto {
  @ApiPropertyOptional({
    description: '頁數',
    example: 2,
    default: 1,
  })
  @IsNotEmpty()
  @IsNumberString()
  @IsOptional()
  public page: number;

  @ApiPropertyOptional({
    description: '每頁輸出數量',
    example: 10,
    default: 15,
  })
  @IsNotEmpty()
  @IsNumberString()
  @IsOptional()
  public limit: number;

  @ApiPropertyOptional({
    description: '車牌號碼關鍵字',
    example: 'ABC',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  public plate_number: string;

  @ApiPropertyOptional({
    description: '車輛廠牌關鍵字',
    example: 'Gogo',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  public manufacture: string;

  @ApiPropertyOptional({
    description: '車輛型號關鍵字',
    example: 'VIVA',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  public model: string;

  @ApiPropertyOptional({
    description: '車輛狀態 (1:等待中, 2:出借中, -1:故障, -2:報廢, -3:錯誤 )',
  })
  @IsNotEmpty()
  @IsIn(Object.values(ScooterStatus).map((s) => `${s}`))
  @IsOptional()
  public status: number;

  @ApiPropertyOptional({
    description: '里程數 (km) 小於等於',
  })
  @IsNotEmpty()
  @IsNumberString()
  @IsOptional()
  public mileage_lte: number;

  @ApiPropertyOptional({
    description: '里程數 (km) 大於等於',
  })
  @IsNotEmpty()
  @IsNumberString()
  @IsOptional()
  public mileage_gte: number;

  @ApiPropertyOptional({
    description: '出廠年份小於等於',
  })
  @IsNotEmpty()
  @IsNumberString()
  @IsOptional()
  public manufacturing_lte: number;

  @ApiPropertyOptional({
    description: '出廠年份大於等於',
  })
  @IsNotEmpty()
  @IsNumberString()
  @IsOptional()
  public manufacturing_gte: number;
}
