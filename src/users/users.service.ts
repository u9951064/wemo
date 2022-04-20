import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUserDto } from './dto/auth-user.dto';
import { UsersRepository } from './users.repository';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly userRepo: UsersRepository,
    private readonly config: ConfigService,
  ) {
    const passwordHashSaltRounds = +this.config.get<number>(
      'PASSWORD_HASH_SALT_ROUNDS',
    );
    this.userRepo.setPasswordHashSaltRounds(+passwordHashSaltRounds);
  }

  async authUser(authUserDto: AuthUserDto): Promise<User | undefined> {
    const user = await this.userRepo.authUser(authUserDto);
    if (!user) {
      return undefined;
    }

    const isPasswordMatch = await bcrypt.compare(
      authUserDto.password,
      user.password,
    );

    if (isPasswordMatch) {
      return user;
    }

    return undefined;
  }
}
