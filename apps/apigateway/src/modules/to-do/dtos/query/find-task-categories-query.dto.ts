import { IFindAllTaskCategoriesDto } from '@app/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class FindTasksCategoriesQueryDto
  implements Omit<IFindAllTaskCategoriesDto, 'userId'>
{
  @ApiPropertyOptional({
    description: 'Name of the task category',
    maxLength: 50,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;
}
