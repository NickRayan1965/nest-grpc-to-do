import { ITaskCategory } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';

export class TaskCategoryDto implements ITaskCategory {
  @ApiProperty({
    title: 'Task Category Id',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    title: 'Task Category Name',
    maxLength: 50,
    minLength: 3,
  })
  name: string;

  @ApiProperty({
    title: 'User Id',
    format: 'uuid',
  })
  userId: string;

  @ApiProperty({
    title: 'Task Category active status',
    default: true,
  })
  isActive: boolean;
}
