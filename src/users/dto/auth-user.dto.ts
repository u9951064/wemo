import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class AuthUserDto extends PickType(CreateUserDto, [
  'username',
  'password',
]) {}
