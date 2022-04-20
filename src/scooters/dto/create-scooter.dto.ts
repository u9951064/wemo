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
import { ScooterStatus } from 'src/constants/scooterStatus';

export class CreateScooterDto {
  @IsString()
  @MaxLength(8)
  @IsNotEmpty()
  public plate_number: string;

  @IsNotEmpty()
  @IsNumber()
  public mileage: number;

  @IsNotEmpty()
  @MaxLength(30)
  @IsLatLong()
  public gps_position: string;

  @IsNotEmpty()
  @MaxLength(25)
  public manufacture: string;

  @IsNotEmpty()
  @MaxLength(25)
  public model: string;

  @IsNotEmpty()
  @MaxLength(25)
  public license_number: string;

  @IsNotEmpty()
  @IsDateString()
  public license_published_at: Date;

  @IsNotEmpty()
  @IsNumber()
  @Min(2020)
  public manufacturing_year: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn(Object.values(ScooterStatus))
  public status: number;
}
