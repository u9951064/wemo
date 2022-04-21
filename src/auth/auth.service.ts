import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JWTTokenDto } from './dto/jwt-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(authUserDto: AuthUserDto): Promise<User | null> {
    const user = await this.usersService.authUser(authUserDto);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: any): JWTTokenDto {
    const payload = {
      username: user.username,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
