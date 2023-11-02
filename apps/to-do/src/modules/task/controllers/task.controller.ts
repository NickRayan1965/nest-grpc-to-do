import {
  ICreateTaskDto,
  IFindAllTasksDto,
  IFindOneTaskDto,
  ITaskListResponse,
  ITaskResponse,
  ITaskServiceController,
  IUpdateTaskDto,
  TaskServiceControllerMethods,
} from '@app/common';
import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TaskService } from '../services/task.service';

@Controller()
@TaskServiceControllerMethods()
export class TaskController implements ITaskServiceController {
  constructor(private readonly taskService: TaskService) {}
  findOneTask(
    request: IFindOneTaskDto,
  ): ITaskResponse | Promise<ITaskResponse> | Observable<ITaskResponse> {
    return this.taskService.findOneById(request);
  }
  findAllTasks(
    request: IFindAllTasksDto,
  ): Promise<ITaskListResponse> | Observable<ITaskListResponse> {
    return this.taskService.findAll(request);
  }
  createTask(
    request: ICreateTaskDto,
  ): Promise<ITaskResponse> | Observable<ITaskResponse> {
    return this.taskService.create(request);
  }
  updateTask(
    request: IUpdateTaskDto,
  ): Promise<ITaskResponse> | Observable<ITaskResponse> {
    return this.taskService.update(request);
  }
  deleteTask(
    request: IFindOneTaskDto,
  ): Promise<ITaskResponse> | Observable<ITaskResponse> {
    return this.taskService.delete(request);
  }
}
