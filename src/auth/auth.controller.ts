import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiBody,
} from '@nestjs/swagger';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';
import { AuthService } from './auth.service';
import { JWTTokenDto } from './dto/jwt-token.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@ApiTags('Authorization')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: '授權登入', description: '取得 JWT token' })
  @ApiBody({ type: AuthUserDto })
  @ApiCreatedResponse({ description: '認證成功', type: JWTTokenDto })
  @ApiUnauthorizedResponse({ description: '認證失敗' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
