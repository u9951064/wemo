import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiParam,
  ApiOperation,
  ApiTags,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ScootersService } from './scooters.service';
import { CreateScooterDto } from './dto/create-scooter.dto';
import { UpdateScooterDto } from './dto/update-scooter.dto';
import { SearchScooterDto } from './dto/search-scooter.dto';
import { Scooter } from './entities/scooter.entity';
import { ScootersPaginationDto } from './dto/scooter-pagination.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('scooters')
@ApiTags('Scooters')
@UseGuards(JwtAuthGuard)
export class ScootersController {
  constructor(private readonly scootersService: ScootersService) {}

  @Post()
  @ApiOperation({ summary: '新增車輛', description: '新增一筆車輛資料' })
  @ApiCreatedResponse({
    description: '建立成功',
  })
  @ApiConflictResponse({
    description: '車籍資料已經存在，請使用更新 Api',
  })
  create(@Body() createScooterDto: CreateScooterDto) {
    return this.scootersService.createScooter(createScooterDto);
  }

  @Get()
  @ApiOperation({
    summary: '查詢車輛',
    description: '依照指定條件查詢車輛資料',
  })
  @ApiOkResponse({
    description: '查詢成功',
    type: ScootersPaginationDto,
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
  @ApiOkResponse({
    description: '查詢成功',
    type: ScootersPaginationDto,
  })
  @ApiNotFoundResponse({
    description: '找不到指定的車籍資料',
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
  @ApiOkResponse({
    description: '資料更新成功',
    type: Scooter,
  })
  @ApiNotFoundResponse({
    description: '找不到指定的車籍資料',
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
