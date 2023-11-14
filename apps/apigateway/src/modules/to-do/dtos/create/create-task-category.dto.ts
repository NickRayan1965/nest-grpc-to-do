import { ICreateTaskCategoryDto } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateTaskCategoryDto
  implements Omit<ICreateTaskCategoryDto, 'userId'>
{
  @ApiProperty({
    title: 'Task category name',
    maxLength: 50,
    minLength: 3,
  })
  @IsString()
  @Length(3, 50)
  name: string;
}
