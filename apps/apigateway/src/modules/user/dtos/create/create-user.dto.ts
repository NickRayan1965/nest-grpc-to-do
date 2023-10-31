import { ICreateUserDto } from '@app/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsUUID, Length } from 'class-validator';

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
export class CreateUserAsAdminDto extends CreateUserDto {
  @ApiPropertyOptional({
    title: 'Roles',
    description: 'Roles of user',
    format: 'uuid',
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  roles: string[];
}
