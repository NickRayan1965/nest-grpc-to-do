import {
  Body,
  Controller,
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

@Controller('task')
@ApiBearerAuth()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Auth()
  @Post()
  create(@GetUser('id') userId: string, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(userId, createTaskDto);
  }

  @Auth()
  @Get()
  findAllTasks(
    @GetUser('id') userId: string,
    @Query() queryParams: FindTasksQueryDto,
  ) {
    return this.taskService.findAll(userId, queryParams);
  }

  @Auth()
  @Get(':id')
  findTaskById(
    @Param('id', ParseUUIDPipe) taskId: string,
    @GetUser('id') userId: string,
  ) {
    return this.taskService.findOneById(userId, taskId);
  }

  @Auth()
  @Patch(':id')
  update(
    @GetUser('id') userId: string,
    @Param('id', ParseUUIDPipe) taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(userId, taskId, updateTaskDto);
  }
}
