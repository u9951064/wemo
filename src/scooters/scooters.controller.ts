import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scootersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScooterDto: UpdateScooterDto) {
    return this.scootersService.update(+id, updateScooterDto);
  }
}
