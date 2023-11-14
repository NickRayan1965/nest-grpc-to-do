import { ITaskCategoryListResponse, ITaskCategoryResponse } from '@app/common';
import { TaskDto } from './task.dto';
import { MetaResponseDto } from 'apps/apigateway/src/common/dtos/response/meta-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponseDto } from 'apps/apigateway/src/common/dtos/response/pagination-response.dto';
import { TaskCategoryDto } from './task-category.dto';

export class TaskCategoryResponseDto implements ITaskCategoryResponse {
  @ApiProperty({
    title: 'Task Category Data',
    type: () => TaskDto,
  })
  data: TaskCategoryDto;
  @ApiProperty({
    title: 'Meta Data',
    type: () => MetaResponseDto,
  })
  meta: MetaResponseDto;
}
export class TaskCategoryListResponseDto implements ITaskCategoryListResponse {
  @ApiProperty({
    title: 'Tasks Categories Data',
    type: () => [TaskCategoryDto],
  })
  data: TaskCategoryDto[];
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
