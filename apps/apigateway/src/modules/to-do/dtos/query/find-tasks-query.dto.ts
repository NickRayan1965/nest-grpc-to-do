import { IFindAllTasksDto } from '@app/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TransformToStringArray } from 'apps/apigateway/src/common/helpers/transform-to-string-array.helper';
import { TaskPriorityEnum } from 'apps/to-do/src/modules/task/entities/enum/task-priority.enum';
import { TaskStatusEnum } from 'apps/to-do/src/modules/task/entities/enum/task-status.enum';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class FindTasksQueryDto implements Omit<IFindAllTasksDto, 'userId'> {
  @ApiPropertyOptional({
    title: 'Filter by content. Search by name or description',
    maxLength: 50,
    minLength: 3,
  })
  @Length(3, 50)
  @IsString()
  @IsOptional()
  filterByContent?: string;

  @ApiPropertyOptional({
    title: 'Filter by expiration',
    format: 'date-time',
  })
  @IsDateString()
  @IsOptional()
  expiration?: string;

  @ApiPropertyOptional({
    enum: TaskPriorityEnum,
    title: 'Filter by priority',
  })
  @IsEnum(TaskPriorityEnum)
  @IsOptional()
  priority?: TaskPriorityEnum;

  @ApiPropertyOptional({
    enum: TaskStatusEnum,
    title: 'Filter by status',
  })
  @IsEnum(TaskStatusEnum)
  @IsOptional()
  status?: TaskStatusEnum;

  @ApiPropertyOptional({
    title: 'Page number',
    minimum: 1,
    default: 1,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({
    title: 'Page size',
    minimum: 1,
    default: 20,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  pageSize?: number;

  @ApiPropertyOptional({
    title: 'Task categories',
    type: [String],
    format: 'uuid',
  })
  @TransformToStringArray()
  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  categoryIds?: string[];
}
