import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('self')
  @ApiOperation({
    summary: '取得操作者資料',
    description: '取得操作者資料',
  })
  @ApiOkResponse({
    description: '取得操作者資料成功',
    type: User,
  })
  getProfile(@Request() req) {
    return req.user;
  }
}
