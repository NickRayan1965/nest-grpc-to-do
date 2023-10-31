import {
  ICreateTaskCategoryDto,
  IFindAllTaskCategoriesDto,
  IFindOneTaskCategoryDto,
  IRestoreTaskCategoryDto,
  ITaskCategoryListResponse,
  ITaskCategoryResponse,
  IUpdateTaskCategoryDto,
  TaskCategoryServiceController,
  TaskCategoryServiceControllerMethods,
} from '@app/common';
import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TaskCategoryService } from '../services/task-category.service';

@Controller()
@TaskCategoryServiceControllerMethods()
export class TaskCategoryController implements TaskCategoryServiceController {
  constructor(private readonly taskCategoryService: TaskCategoryService) {}
  findOneTaskCategory(
    request: IFindOneTaskCategoryDto,
  ):
    | ITaskCategoryResponse
    | Promise<ITaskCategoryResponse>
    | Observable<ITaskCategoryResponse> {
    return this.taskCategoryService.findOneById(request);
  }

  findAllTaskCategories(
    request: IFindAllTaskCategoriesDto,
  ):
    | ITaskCategoryListResponse
    | Promise<ITaskCategoryListResponse>
    | Observable<ITaskCategoryListResponse> {
    return this.taskCategoryService.findAll(request);
  }
  createTaskCategory(
    request: ICreateTaskCategoryDto,
  ): Promise<ITaskCategoryResponse> | Observable<ITaskCategoryResponse> {
    return this.taskCategoryService.create(request);
  }
  updateTaskCategory(
    request: IUpdateTaskCategoryDto,
  ): Promise<ITaskCategoryResponse> | Observable<ITaskCategoryResponse> {
    return this.taskCategoryService.updateOneById(request);
  }
  deleteTaskCategory(
    request: IFindOneTaskCategoryDto,
  ): Promise<ITaskCategoryResponse> | Observable<ITaskCategoryResponse> {
    return this.taskCategoryService.deleteOneById(request);
  }
  restoreTaskCategory(
    request: IRestoreTaskCategoryDto,
  ): Promise<ITaskCategoryResponse> | Observable<ITaskCategoryResponse> {
    return this.taskCategoryService.restoreOneById(request);
  }
}
