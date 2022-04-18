import { Module } from '@nestjs/common';
import { ScootersService } from './scooters.service';
import { ScootersController } from './scooters.controller';

@Module({
  controllers: [ScootersController],
  providers: [ScootersService]
})
export class ScootersModule {}
