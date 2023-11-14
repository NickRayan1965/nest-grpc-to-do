import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
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
import { ParseMongoIdPipe } from 'apps/apigateway/src/common/pipe/parse-mongo-id.pipe';

@Controller('task')
@ApiTags('Task')
@ApiBearerAuth()
@ApiBadRequestResponseImplementation()
@ApiUnauthorizedResponseImplementation()
@ApiNotFoundImplementation()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Create new task' })
  @ApiCreatedResponseImplementation(TaskResponseDto)
  @Auth()
  @Post()
  create(@GetUser('id') userId: string, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(userId, createTaskDto);
  }

  @ApiOperation({ summary: 'Find all tasks (by the user request)' })
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

  @ApiOperation({ summary: 'Find task by id' })
  @ApiOkResponseImplementation({
    type: TaskResponseDto,
    method: 'get',
  })
  @Auth()
  @Get(':id')
  findTaskById(
    @Param('id', ParseMongoIdPipe) taskId: string,
    @GetUser('id') userId: string,
  ) {
    return this.taskService.findOneById(userId, taskId);
  }

  @ApiOperation({ summary: 'Update task by id' })
  @ApiOkResponseImplementation({
    type: TaskResponseDto,
    method: 'update',
  })
  @Auth()
  @Patch(':id')
  update(
    @GetUser('id') userId: string,
    @Param('id', ParseMongoIdPipe) taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(userId, taskId, updateTaskDto);
  }

  @ApiOperation({ summary: 'Delete task by id' })
  @ApiOkResponseImplementation({
    type: TaskResponseDto,
    method: 'delete',
  })
  @Auth()
  @Delete(':id')
  delete(
    @GetUser('id') userId: string,
    @Param('id', ParseMongoIdPipe) taskId: string,
  ) {
    return this.taskService.delete(userId, taskId);
  }
}
