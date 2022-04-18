import { Injectable } from '@nestjs/common';
import { CreateScooterDto } from './dto/create-scooter.dto';
import { UpdateScooterDto } from './dto/update-scooter.dto';
import { Scooter } from './entities/scooter.entity';

@Injectable()
export class ScootersService {
  create(createScooterDto: CreateScooterDto) {
    return 'This action adds a new scooter';
  }

  findAll(): Promise<Scooter[]> {
    return `This action returns all scooters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scooter`;
  }

  update(id: number, updateScooterDto: UpdateScooterDto) {
    return `This action updates a #${id} scooter`;
  }

  remove(id: number) {
    return `This action removes a #${id} scooter`;
  }
}
