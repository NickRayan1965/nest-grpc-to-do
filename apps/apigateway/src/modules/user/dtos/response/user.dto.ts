import { IUser } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { RoleDto } from '../../../role/dtos/response/role.dto';

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

  @ApiProperty({
    type: () => [RoleDto],
  })
  roles: RoleDto[];
}
