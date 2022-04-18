import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param
} from '@nestjs/common';
import { ScootersService } from './scooters.service';
import { CreateScooterDto } from './dto/create-scooter.dto';
import { UpdateScooterDto } from './dto/update-scooter.dto';

@Controller('scooters')
export class ScootersController {
  constructor(private readonly scootersService: ScootersService) {}

  @Post()
  create(@Body() createScooterDto: CreateScooterDto) {
    return this.scootersService.create(createScooterDto);
  }

  @Get()
  findAll() {
    return this.scootersService.findAll();
  }

  @Get(':plateNumber')
  findOne(@Param('plateNumber') plateNumber: string) {
    return this.scootersService.findOne(`${plateNumber}`);
  }

  @Patch(':plateNumber')
  update(
    @Param('plateNumber') plateNumber: string,
    @Body() updateScooterDto: UpdateScooterDto,
  ) {
    return this.scootersService.update(`${plateNumber}`, updateScooterDto);
  }
}
