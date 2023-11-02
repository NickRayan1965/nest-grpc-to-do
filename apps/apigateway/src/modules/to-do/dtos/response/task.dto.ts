import { ITask } from '@app/common';
import { TaskPriorityEnum } from 'apps/to-do/src/modules/task/entities/enum/task-priority.enum';
import { TaskStatusEnum } from 'apps/to-do/src/modules/task/entities/enum/task-status.enum';
import { TaskCategoryDto } from './task-category.dto';
import { ApiProperty } from '@nestjs/swagger';

export class TaskDto implements ITask {
  @ApiProperty({
    title: 'Task Id',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    title: 'User Id',
    format: 'uuid',
  })
  userId: string;

  @ApiProperty({
    title: 'Task Name',
    maxLength: 50,
    minLength: 3,
  })
  name: string;

  @ApiProperty({
    title: 'Task Description',
    maxLength: 500,
    minLength: 0,
    nullable: true,
  })
  description: string;

  @ApiProperty({
    title: 'Task Expiration',
    format: 'date-time',
  })
  expiration: string;

  @ApiProperty({
    title: 'Task Created At',
    format: 'date-time',
  })
  createdAt: string;

  @ApiProperty({
    title: 'Task Priority',
    enum: TaskPriorityEnum,
  })
  priority: TaskPriorityEnum;

  @ApiProperty({
    title: 'Task Status',
    enum: TaskStatusEnum,
    default: TaskStatusEnum.PENDING,
  })
  status: TaskStatusEnum;

  @ApiProperty({
    title: 'Task Categories',
    type: () => [TaskCategoryDto],
  })
  categories: TaskCategoryDto[];
}
