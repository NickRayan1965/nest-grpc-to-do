import {
  TASK_CATEGORY_SERVICE_NAME,
  TaskCategoryServiceClient,
} from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { TODO_SERVICE } from '../constants';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateTaskCategoryDto } from '../dtos/create/create-task-category.dto';
import { UpdateTaskCategoryDto } from '../dtos/update/update-task-category.dto';
import { FindTasksCategoriesQueryDto } from '../dtos/query/find-task-categories-query.dto';

@Injectable()
export class TaskCategoryService implements OnModuleInit {
  private taskCategoryService: TaskCategoryServiceClient;
  constructor(@Inject(TODO_SERVICE) private client: ClientGrpc) {}
  onModuleInit() {
    this.taskCategoryService =
      this.client.getService<TaskCategoryServiceClient>(
        TASK_CATEGORY_SERVICE_NAME,
      );
  }
  create(userId: string, dto: CreateTaskCategoryDto) {
    return this.taskCategoryService.createTaskCategory({
      ...dto,
      userId,
    });
  }
  update(userId: string, taskCategoryId: string, dto: UpdateTaskCategoryDto) {
    return this.taskCategoryService.updateTaskCategory({
      id: taskCategoryId,
      userId,
      ...dto,
    });
  }
  async findAll(
    userId: string,
    findTasksQueryDto: FindTasksCategoriesQueryDto,
  ) {
    return this.taskCategoryService.findAllTaskCategories({
      userId,
      ...findTasksQueryDto,
    });
  }
}
