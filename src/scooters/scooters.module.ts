import { Module } from '@nestjs/common';
import { ScootersService } from './scooters.service';
import { ScootersController } from './scooters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScootersRepository } from './scooters.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ScootersRepository])],
  controllers: [ScootersController],
  providers: [ScootersService],
})
export class ScootersModule {}
