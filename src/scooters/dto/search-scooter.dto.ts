import {
  IsOptional,
  IsNumberString,
  IsString,
  IsIn,
  IsNotEmpty,
} from 'class-validator';
import { ScooterStatus } from 'src/constants/scooterStatus';

export class SearchScooterDto {
  @IsNotEmpty()
  @IsNumberString()
  @IsOptional()
  public page: number;

  @IsNotEmpty()
  @IsNumberString()
  @IsOptional()
  public limit: number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  public plate_number: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  public manufacture: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  public model: string;

  @IsNotEmpty()
  @IsIn(Object.values(ScooterStatus).map((s) => `${s}`))
  @IsOptional()
  public status: number;

  @IsNotEmpty()
  @IsNumberString()
  @IsOptional()
  public mileage_lte: number;

  @IsNotEmpty()
  @IsNumberString()
  @IsOptional()
  public mileage_gte: number;

  @IsNotEmpty()
  @IsNumberString()
  @IsOptional()
  public manufacturing_lte: number;

  @IsNotEmpty()
  @IsNumberString()
  @IsOptional()
  public manufacturing_gte: number;
}
