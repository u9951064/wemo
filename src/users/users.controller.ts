import {
  Controller,
  Request,
  Get,
  UseGuards,
  Body,
  Post,
  Patch,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiParam,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('self')
  @ApiOperation({
    summary: '取得自己的資料',
    description: '取得自己的資料',
  })
  @ApiOkResponse({
    description: '取得自己的資料成功',
    type: User,
  })
  async getSelf(@Request() req) {
    const user = await this.usersService.getUser(req.id);
    return this.filterPassword(user);
  }

  @Patch('self')
  @ApiOperation({
    summary: '更新自己的資料',
    description: '更新自己的資料',
  })
  @ApiOkResponse({
    description: '更新自己的資料成功',
    type: User,
  })
  async updateSelf(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.updateUser(req.id, updateUserDto);
    return this.filterPassword(user);
  }

  @ApiOperation({
    summary: '新增操作者資料',
    description: '新增操作者資料',
  })
  @ApiCreatedResponse({
    description: '建立成功',
    type: User,
  })
  @ApiConflictResponse({
    description: '使用者資料已經存在，請使用更新 Api',
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    return this.filterPassword(user);
  }

  @Patch(':userId')
  @ApiOperation({
    summary: '更新操作者資料',
    description: '更新操作者資料',
  })
  @ApiParam({
    name: 'userId',
    description: '使用者ID',
    example: 1,
  })
  @ApiOkResponse({
    description: '更新操作者資料成功',
    type: User,
  })
  @ApiNotFoundResponse({
    description: '查無指定使用者',
  })
  async updateUser(
    @Param('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.updateUser(userId, updateUserDto);
    return this.filterPassword(user);
  }

  @Get(':userId')
  @ApiOperation({
    summary: '查詢操作者資料',
    description: '查詢操作者資料',
  })
  @ApiParam({
    name: 'userId',
    description: '使用者ID',
    example: 1,
  })
  @ApiOkResponse({
    description: '取得操作者的資料成功',
    type: User,
  })
  @ApiNotFoundResponse({
    description: '查無指定使用者',
  })
  async getUser(@Param('userId') userId: number) {
    const user = await this.usersService.getUser(userId);
    return this.filterPassword(user);
  }

  protected filterPassword(user: User): User {
    delete user.password;
    return user;
  }
}
