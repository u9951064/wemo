import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScooterDto } from './dto/create-scooter.dto';
import { UpdateScooterDto } from './dto/update-scooter.dto';
import { Scooter } from './entities/scooter.entity';

@Injectable()
export class ScootersService {
  constructor(
    // 注入 Users Entity
    @InjectRepository(Scooter)
    private readonly scooterRepo: Repository<Scooter>,
  ) {}

  async create(createScooterDto: CreateScooterDto): Promise<Scooter> {
    return await this.scooterRepo.save(createScooterDto);
  }

  async findAll(): Promise<Scooter[]> {
    return await this.scooterRepo.find();
  }

  async findOne(plateNumber: string) {
    return await this.scooterRepo.findOne(plateNumber);
  }

  update(plateNumber: string, updateScooterDto: UpdateScooterDto) {
    return `This action updates a #${plateNumber} scooter`;
  }
}
