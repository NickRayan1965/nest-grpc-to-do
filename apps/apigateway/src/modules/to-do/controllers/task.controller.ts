import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../dtos/create/create-task.dto';
import { GetUser } from 'apps/apigateway/src/auth/decorators/get-user.decorator';
import { Auth } from 'apps/apigateway/src/auth/decorators/auth.decorator';
import { UpdateTaskDto } from '../dtos/update/update-task.dto';
import { FindTasksQueryDto } from '../dtos/query/find-tasks-query.dto';
import {
  ApiBadRequestResponseImplementation,
  ApiCreatedResponseImplementation,
  ApiNotFoundImplementation,
  ApiOkResponseImplementation,
  ApiUnauthorizedResponseImplementation,
} from 'apps/apigateway/src/common/decorators/swagger-controller.decorator';
import {
  TaskListResponseDto,
  TaskResponseDto,
} from '../dtos/response/task-response.dto';

@Controller('task')
@ApiBearerAuth()
@ApiBadRequestResponseImplementation()
@ApiUnauthorizedResponseImplementation()
@ApiNotFoundImplementation()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiCreatedResponseImplementation(TaskResponseDto)
  @Auth()
  @Post()
  create(@GetUser('id') userId: string, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(userId, createTaskDto);
  }

  @ApiOkResponseImplementation({
    type: TaskListResponseDto,
    method: 'get',
  })
  @Auth()
  @Get()
  findAllTasks(
    @GetUser('id') userId: string,
    @Query() queryParams: FindTasksQueryDto,
  ) {
    return this.taskService.findAll(userId, queryParams);
  }

  @ApiOkResponseImplementation({
    type: TaskResponseDto,
    method: 'get',
  })
  @Auth()
  @Get(':id')
  findTaskById(
    @Param('id', ParseUUIDPipe) taskId: string,
    @GetUser('id') userId: string,
  ) {
    return this.taskService.findOneById(userId, taskId);
  }

  @ApiOkResponseImplementation({
    type: TaskResponseDto,
    method: 'update',
  })
  @Auth()
  @Patch(':id')
  update(
    @GetUser('id') userId: string,
    @Param('id', ParseUUIDPipe) taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(userId, taskId, updateTaskDto);
  }

  @ApiOkResponseImplementation({
    type: TaskResponseDto,
    method: 'delete',
  })
  @Auth()
  @Delete(':id')
  delete(
    @GetUser('id') userId: string,
    @Param('id', ParseUUIDPipe) taskId: string,
  ) {
    return this.taskService.delete(userId, taskId);
  }
}
