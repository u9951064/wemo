import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiParam,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ScootersService } from './scooters.service';
import { CreateScooterDto } from './dto/create-scooter.dto';
import { UpdateScooterDto } from './dto/update-scooter.dto';
import { SearchScooterDto } from './dto/search-scooter.dto';

@Controller('scooters')
@ApiTags('scooters')
export class ScootersController {
  constructor(private readonly scootersService: ScootersService) {}

  @Post()
  @ApiOperation({ summary: '新增車輛', description: '新增一筆車輛資料' })
  @ApiOkResponse()
  create(@Body() createScooterDto: CreateScooterDto) {
    return this.scootersService.createScooter(createScooterDto);
  }

  @Get()
  @ApiOperation({
    summary: '查詢車輛',
    description: '依照指定條件查詢車輛資料',
  })
  search(@Query() searchScooterDto: SearchScooterDto) {
    return this.scootersService.searchScooter(searchScooterDto);
  }

  @Get(':plateNumber')
  @ApiOperation({
    summary: '取得車輛資料',
    description: '取得指定車牌的車輛資料',
  })
  @ApiParam({
    name: 'plateNumber',
    description: '車牌號碼',
    example: 'ABC-1234',
  })
  findOne(@Param('plateNumber') plateNumber: string) {
    return this.scootersService.findScooter(`${plateNumber}`);
  }

  @Patch(':plateNumber')
  @ApiOperation({
    summary: '更新車輛資料',
    description: '更新指定車牌的車輛資料',
  })
  @ApiParam({
    name: 'plateNumber',
    description: '車牌號碼',
    example: 'ABC-1234',
  })
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
