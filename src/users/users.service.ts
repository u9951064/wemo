import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUserDto } from './dto/auth-user.dto';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const isExist = await this.userRepo.findOne({
      username: createUserDto.username,
    });
    if (isExist) {
      throw new ConflictException(
        `Username existed: "${createUserDto.username}"`,
      );
    }
    return await this.userRepo.createUser(createUserDto);
  }

  async updateUser(
    userId: number,
    UpdateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.getUser(userId);
    Object.keys(UpdateUserDto).forEach((k) => {
      if (k === 'password') {
        return;
      }
      user[k] = UpdateUserDto[k];
    });

    return await this.userRepo.updateUser(user, UpdateUserDto);
  }

  async getUser(userId: number): Promise<User> {
    const user = await this.userRepo.findOne(userId);
    if (!user) {
      throw new NotFoundException('查無指定使用者資料');
    }
    return user;
  }
}
