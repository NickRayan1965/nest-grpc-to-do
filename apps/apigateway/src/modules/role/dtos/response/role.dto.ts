import { IRole, IUser } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from 'apps/auth/src/role/entities/enum/role.enum';

export class RoleDto implements IRole {
  @ApiProperty({
    format: 'uuid',
    uniqueItems: true,
  })
  id: string;

  @ApiProperty({
    uniqueItems: true,
    enum: RoleEnum,
  })
  name: RoleEnum;

  @ApiProperty()
  description: string;

  users: IUser[];
}
