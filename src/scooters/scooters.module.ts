import { Module } from '@nestjs/common';
import { ScootersService } from './scooters.service';
import { ScootersController } from './scooters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scooter } from './entities/scooter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scooter])],
  controllers: [ScootersController],
  providers: [ScootersService],
})
export class ScootersModule {}
