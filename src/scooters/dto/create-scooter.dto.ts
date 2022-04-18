import { IsNotEmpty, IsString, IsNumber, MaxLength } from 'class-validator';

export class CreateScooterDto {
  @IsString()
  @MaxLength(8)
  @IsNotEmpty()
  plateNumber: string;

  @IsNotEmpty()
  @IsNumber()
  mileage: number;

  @IsNotEmpty()
  @MaxLength(20)
  @IsString()
  gps_position: string;

  @IsNotEmpty()
  @IsNumber()
  status: number;
}
