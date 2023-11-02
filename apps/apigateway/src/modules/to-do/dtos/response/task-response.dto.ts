import { ITaskListResponse, ITaskResponse } from '@app/common';
import { TaskDto } from './task.dto';
import { MetaResponseDto } from 'apps/apigateway/src/common/dtos/response/meta-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponseDto } from 'apps/apigateway/src/common/dtos/response/pagination-response.dto';

export class TaskResponseDto implements ITaskResponse {
  @ApiProperty({
    title: 'Task Data',
    type: () => TaskDto,
  })
  data: TaskDto;
  @ApiProperty({
    title: 'Meta Data',
    type: () => MetaResponseDto,
  })
  meta: MetaResponseDto;
}
export class TaskListResponseDto implements ITaskListResponse {
  @ApiProperty({
    title: 'Tasks Data',
    type: () => [TaskDto],
  })
  data: TaskDto[];
  @ApiProperty({
    title: 'Meta Data',
    type: () => MetaResponseDto,
  })
  meta: MetaResponseDto;

  @ApiProperty({
    title: 'Pagination Info',
    type: () => PaginationResponseDto,
  })
  pagination: PaginationResponseDto;
}
