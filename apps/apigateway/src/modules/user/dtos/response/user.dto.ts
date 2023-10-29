import { IUser } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto implements IUser {
  @ApiProperty({
    format: 'uuid',
    uniqueItems: true,
  })
  id: string;

  @ApiProperty({
    uniqueItems: true,
  })
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  isActive: boolean;
}
