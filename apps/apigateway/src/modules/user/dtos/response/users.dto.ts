import { IUsers } from '@app/common';
import { UserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UsersDto implements IUsers {
  @ApiProperty({
    type: () => [UserDto],
  })
  users: UserDto[];
}
