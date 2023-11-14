import { ICreateTaskDto } from '@app/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskPriorityEnum } from 'apps/to-do/src/modules/task/entities/enum/task-priority.enum';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateTaskDto implements Omit<ICreateTaskDto, 'userId'> {
  @ApiProperty({
    title: 'Task name',
    maxLength: 50,
    minLength: 3,
  })
  @Length(3, 50)
  @IsString()
  name: string;

  @ApiPropertyOptional({
    title: 'Task description',
    maxLength: 500,
  })
  @Length(0, 500)
  @IsOptional()
  description?: string;

  @ApiProperty({
    title: 'Task expiration',
    format: 'date-time',
  })
  @IsDateString()
  expiration: string;

  @ApiProperty({
    enum: TaskPriorityEnum,
    title: 'Task priority',
  })
  @IsEnum(TaskPriorityEnum)
  priority: TaskPriorityEnum;

  @ApiPropertyOptional({
    title: 'Task categories',
    type: [String],
    format: 'uuid',
  })
  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  categoryIds: string[];
}
