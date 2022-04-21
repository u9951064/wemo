import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

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

  /**
   * 更新的使用者
   * @param {User} user 使用者紀錄
   * @param {UpdateUserDto} updateUserDto 要更新的使用者資料
   * @returns
   */
  async updateUser(user: User, updateUserDto: UpdateUserDto): Promise<User> {
    if (
      updateUserDto.hasOwnProperty('password') &&
      updateUserDto.password !== ''
    ) {
      user.password = await this.getHashedPassword(updateUserDto.password);
    }

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
