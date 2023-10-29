import { ICreateUserDto } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateUserDto implements ICreateUserDto {
  @ApiProperty({
    title: 'Username',
    maxLength: 20,
    minLength: 4,
  })
  @IsString()
  @Length(4, 20)
  username: string;

  @ApiProperty({
    title: 'Password',
    maxLength: 20,
    minLength: 4,
  })
  @IsString()
  @Length(4, 20)
  password: string;
}
