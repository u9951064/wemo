import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateScooterDto } from './create-scooter.dto';

export class UpdateScooterDto extends PartialType(
  OmitType(CreateScooterDto, ['plate_number']),
) {}
