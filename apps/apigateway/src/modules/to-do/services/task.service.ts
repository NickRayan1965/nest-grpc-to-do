import { ITaskServiceClient, TASK_SERVICE_NAME } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { TODO_SERVICE } from '../constants';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateTaskDto } from '../dtos/create/create-task.dto';
import { UpdateTaskDto } from '../dtos/update/update-task.dto';
import { FindTasksQueryDto } from '../dtos/query/find-tasks-query.dto';

@Injectable()
export class TaskService implements OnModuleInit {
  private taskService: ITaskServiceClient;
  constructor(@Inject(TODO_SERVICE) private client: ClientGrpc) {}
  onModuleInit() {
    this.taskService =
      this.client.getService<ITaskServiceClient>(TASK_SERVICE_NAME);
  }
  create(userId: string, dto: CreateTaskDto) {
    return this.taskService.createTask({ userId, ...dto });
  }
  update(userId: string, taskId: string, dto: UpdateTaskDto) {
    return this.taskService.updateTask({ id: taskId, userId, ...dto });
  }
  delete(userId: string, taskId: string) {
    return this.taskService.deleteTask({ id: taskId, userId });
  }
  findAll(userId: string, findTasksQueryDto: FindTasksQueryDto) {
    return this.taskService.findAllTasks({
      userId,
      ...findTasksQueryDto,
    });
  }
}
