import { IUser } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    type: Object,
    title: 'User',
  })
  user: IUser;

  @ApiProperty({
    title: 'JWT',
  })
  jwt: string;
}
