import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'apps/apigateway/src/auth/decorators/get-user.decorator';
import { Auth } from 'apps/apigateway/src/auth/decorators/auth.decorator';
import {
  ApiBadRequestResponseImplementation,
  ApiCreatedResponseImplementation,
  ApiNotFoundImplementation,
  ApiOkResponseImplementation,
  ApiUnauthorizedResponseImplementation,
} from 'apps/apigateway/src/common/decorators/swagger-controller.decorator';
import { TaskCategoryService } from '../services/task-category.service';
import { CreateTaskCategoryDto } from '../dtos/create/create-task-category.dto';
import { TaskCategoryDto } from '../dtos/response/task-category.dto';
import { TaskCategoryListResponseDto } from '../dtos/response/task-category-response.dto';
import { FindTasksCategoriesQueryDto } from '../dtos/query/find-task-categories-query.dto';

@ApiTags('Task Category')
@ApiBearerAuth()
@ApiBadRequestResponseImplementation()
@ApiUnauthorizedResponseImplementation()
@ApiNotFoundImplementation()
@Controller('task-category')
export class TaskCategoryController {
  constructor(private readonly taskCategoryService: TaskCategoryService) {}

  @ApiOperation({ summary: 'Create new task category' })
  @ApiCreatedResponseImplementation(TaskCategoryDto)
  @Auth()
  @Post()
  create(@GetUser('id') userId: string, @Body() dto: CreateTaskCategoryDto) {
    return this.taskCategoryService.create(userId, dto);
  }

  @ApiOperation({ summary: 'Find all tasks  categories(by the user request)' })
  @ApiOkResponseImplementation({
    type: TaskCategoryListResponseDto,
    method: 'get',
  })
  @Auth()
  @Get()
  findAllTasks(
    @GetUser('id') userId: string,
    @Query() queryParams: FindTasksCategoriesQueryDto,
  ) {
    return this.taskCategoryService.findAll(userId, queryParams);
  }
}
