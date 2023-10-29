import { ILoginDto } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class LoginDto implements ILoginDto {
  @ApiProperty({
    title: 'Username',
    minLength: 4,
    maxLength: 20,
  })
  @IsString()
  @Length(4, 20)
  username: string;

  @ApiProperty({
    title: 'Password',
    minLength: 4,
    maxLength: 20,
  })
  @IsString()
  @Length(4, 20)
  password: string;
}
