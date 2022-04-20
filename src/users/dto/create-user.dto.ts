import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    maxLength: 20,
    description: '使用者帳號',
    example: 'user1',
  })
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  public username: string;

  @ApiProperty({
    description: '使用者密碼',
    example: 'password string',
  })
  @IsNotEmpty()
  @IsString()
  public password: string;
}
