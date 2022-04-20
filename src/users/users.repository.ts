import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  private passwordHashSaltRounds = 10;

  setPasswordHashSaltRounds(saltRounds: number) {
    this.passwordHashSaltRounds = saltRounds;
  }

  /**
   *
   * 依照輸入資料驗證
   * @param {AuthUserDto} userAuthDto 使用者認證資料
   * @returns
   */
  async authUser(authUserDto: AuthUserDto): Promise<User | undefined> {
    return await this.findOne({ username: authUserDto.username });
  }

  /**
   * 建立新的使用者
   * @param {CreateUserDto} createUserDto 使用者資料
   * @returns
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.create(createUserDto);
    user.password = await this.getHashedPassword(createUserDto.password);

    try {
      await user.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return user;
  }

  private async getHashedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.passwordHashSaltRounds);
    return await bcrypt.hash(password, salt);
  }
}
