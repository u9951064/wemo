import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@ApiTags('Authorization')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: '授權登入', description: '取得 JWT token' })
  @ApiCreatedResponse({ description: '認證成功' })
  @ApiUnauthorizedResponse({ description: '認證失敗' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
