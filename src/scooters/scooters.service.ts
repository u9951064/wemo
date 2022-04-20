import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets } from 'typeorm';
import { CreateScooterDto } from './dto/create-scooter.dto';
import { SearchScooterDto } from './dto/search-scooter.dto';
import { UpdateScooterDto } from './dto/update-scooter.dto';
import { Scooter } from './entities/scooter.entity';
import { ScootersPaginationDto } from './dto/scooter-pagination.dto';
import { ScootersRepository } from './scooters.repository';

@Injectable()
export class ScootersService {
  constructor(
    @InjectRepository(ScootersRepository)
    private readonly scooterRepo: ScootersRepository,
  ) {}

  async createScooter(createScooterDto: CreateScooterDto): Promise<Scooter> {
    createScooterDto.plate_number = createScooterDto.plate_number.toUpperCase();
    const isExist = await this.scooterRepo.findOne(
      createScooterDto.plate_number,
    );
    if (isExist) {
      throw new ConflictException(
        `Duplicated Scooter Data: "${createScooterDto.plate_number}"`,
      );
    }
    return await this.scooterRepo.createScooter(createScooterDto);
  }

  async searchScooter(
    searchScooterDto: SearchScooterDto,
  ): Promise<ScootersPaginationDto> {
    const page = Math.max(1, searchScooterDto.page || 1);
    const limit = Math.max(1, searchScooterDto.limit || 15);

    // Apply search conditions
    const conditions = new Brackets((qb) => {
      if (
        searchScooterDto.hasOwnProperty('plate_number') &&
        searchScooterDto.plate_number !== ''
      ) {
        qb.andWhere('plate_number like :plateNumber', {
          plateNumber: `%${searchScooterDto.plate_number}%`,
        });
      }

      if (
        searchScooterDto.hasOwnProperty('manufacture') &&
        searchScooterDto.manufacture !== ''
      ) {
        qb.andWhere('manufacture like :manufacture', {
          manufacture: `%${searchScooterDto.manufacture}%`,
        });
      }

      if (
        searchScooterDto.hasOwnProperty('model') &&
        searchScooterDto.manufacture !== ''
      ) {
        qb.andWhere('model like :model', {
          model: `%${searchScooterDto.model}%`,
        });
      }

      if (
        searchScooterDto.hasOwnProperty('mileage_lte') &&
        searchScooterDto.mileage_lte > 0
      ) {
        qb.andWhere('mileage <= :mileageLte', {
          mileageLte: searchScooterDto.mileage_lte,
        });
      }

      if (
        searchScooterDto.hasOwnProperty('mileage_gte') &&
        searchScooterDto.mileage_gte > 0
      ) {
        qb.andWhere('mileage >= :mileageGte', {
          mileageGte: searchScooterDto.mileage_gte,
        });
      }

      if (searchScooterDto.hasOwnProperty('status')) {
        qb.andWhere('status = :status', {
          status: searchScooterDto.status,
        });
      }

      if (
        searchScooterDto.hasOwnProperty('manufacturing_lte') &&
        searchScooterDto.manufacturing_lte > 0
      ) {
        qb.andWhere('mileage <= :manufacturingLte', {
          manufacturingLte: searchScooterDto.manufacturing_lte,
        });
      }

      if (
        searchScooterDto.hasOwnProperty('manufacturing_gte') &&
        searchScooterDto.manufacturing_gte > 0
      ) {
        qb.andWhere('mileage >= :manufacturingGte', {
          manufacturingGte: searchScooterDto.manufacturing_gte,
        });
      }
    });

    return await this.scooterRepo.searchScooter(page, limit, conditions);
  }

  async findScooter(plateNumber: string) {
    plateNumber = plateNumber.toUpperCase();
    const scooter = await this.scooterRepo.findOne(plateNumber);
    if (!scooter) {
      throw new NotFoundException(`Not Found Scooter Data: "${plateNumber}"`);
    }
    return scooter;
  }

  async updateScooter(
    plateNumber: string,
    updateScooterDto: UpdateScooterDto,
  ): Promise<Scooter> {
    plateNumber = plateNumber.toUpperCase();

    // Get scooter record
    const scooter = await this.findScooter(plateNumber);

    // Apply update data to scooter record
    Object.assign(scooter, updateScooterDto);

    // Save changes
    return await this.scooterRepo.save(scooter);
  }
}
