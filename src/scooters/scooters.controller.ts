import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { ScootersService } from './scooters.service';
import { CreateScooterDto } from './dto/create-scooter.dto';
import { UpdateScooterDto } from './dto/update-scooter.dto';
import { SearchScooterDto } from './dto/search-scooter.dto';

@Controller('scooters')
export class ScootersController {
  constructor(private readonly scootersService: ScootersService) {}

  @Post()
  create(@Body() createScooterDto: CreateScooterDto) {
    return this.scootersService.createScooter(createScooterDto);
  }

  @Get()
  search(@Query() searchScooterDto: SearchScooterDto) {
    return this.scootersService.searchScooter(searchScooterDto);
  }

  @Get(':plateNumber')
  findOne(@Param('plateNumber') plateNumber: string) {
    return this.scootersService.findScooter(`${plateNumber}`);
  }

  @Patch(':plateNumber')
  update(
    @Param('plateNumber') plateNumber: string,
    @Body() updateScooterDto: UpdateScooterDto,
  ) {
    return this.scootersService.updateScooter(
      `${plateNumber}`,
      updateScooterDto,
    );
  }
}
