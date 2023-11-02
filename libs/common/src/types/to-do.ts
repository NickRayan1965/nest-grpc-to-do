/* eslint-disable @typescript-eslint/ban-types */
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import BooleanString from '../interfaces/boolean-string.interface';
import { Types } from 'mongoose';
import { TaskPriorityEnum } from 'apps/to-do/src/modules/task/entities/enum/task-priority.enum';
import { TaskStatusEnum } from 'apps/to-do/src/modules/task/entities/enum/task-status.enum';

export const protobufPackageTaskCategory = 'taskcategory';

//<<Task>>
export interface ITask {
  _id: string | Types.ObjectId;
  userId: string;
  name: string;
  description: string;
  expiration: string;
  createdAt: string;
  priority: TaskPriorityEnum;
  status: TaskStatusEnum;
  categories: ITaskCategory[];
}
export interface ICreateTaskDto {
  userId: string;
  name: string;
  description?: string;
  expiration: string;
  priority: TaskPriorityEnum;
  categoryIds: string[];
}
export interface IUpdateTaskDto {
  _id: string;
  userId: string;
  name?: string;
  description?: string;
  expiration?: string;
  priority?: TaskPriorityEnum;
  categoryIds?: string[];
}
export interface IFindOneTaskDto {
  _id: string;
  userId: string;
}
export interface IFindAllTasksDto {
  userId: string;
  filterByContent?: string;
  expiration?: string;
  priority?: TaskPriorityEnum;
  status?: TaskStatusEnum;
  page?: number;
  pageSize?: number;
  categoryIds?: string[];
}
export interface ITaskResponse {
  data: ITask;
  meta: IMetaResponse;
}
export interface ITaskListResponse {
  data: ITask[];
  pagination: IPaginationResponse;
  meta: IMetaResponse;
}
//<<Task>>

export interface ITaskCategory {
  id: string | Types.ObjectId;
  name: string;
  userId: string;
  isActive: boolean;
}

export interface IFindAllTaskCategoriesDto {
  userId: string;
  name?: string;
  isActive?: BooleanString;
}
export interface IPaginationResponse {
  total_count: number;
  // page_size: number;
  // page: number;
}

export interface IMetaResponse {
  statusCode: number;
  message: string;
  errors?: any;
}

export interface ITaskCategoryResponse {
  data: ITaskCategory;
  meta: IMetaResponse;
}

export interface ITaskCategoryListResponse {
  data: ITaskCategory[];
  pagination: IPaginationResponse;
  meta: IMetaResponse;
}

export interface IFindOneTaskCategoryDto {
  id: string;
  userId: string;
}

export interface ICreateTaskCategoryDto {
  name: string;
  userId: string;
}

export interface IUpdateTaskCategoryDto {
  id: string;
  userId: string;
  name: string;
}
export interface IRestoreTaskCategoryDto {
  id: string;
  userId: string;
}

export const TODO_PACKAGE_NAME = 'todo';

export interface TaskCategoryServiceClient {
  findOneTaskCategory(
    request: IFindOneTaskCategoryDto,
  ): Observable<ITaskCategoryResponse>;
  findAllTaskCategories(
    request: IFindAllTaskCategoriesDto,
  ): Observable<ITaskCategoryListResponse>;
  createTaskCategory(
    request: ICreateTaskCategoryDto,
  ): Observable<ITaskCategoryResponse>;
  updateTaskCategory(
    request: IUpdateTaskCategoryDto,
  ): Observable<ITaskCategoryResponse>;
  deleteTaskCategory(
    request: IFindOneTaskCategoryDto,
  ): Observable<ITaskCategoryResponse>;
  restoreTaskCategory(
    request: IRestoreTaskCategoryDto,
  ): Observable<ITaskCategoryResponse>;
}
export interface ITaskServiceClient {
  findOneTask(request: IFindOneTaskDto): Observable<ITaskResponse>;
  findAllTasks(request: IFindAllTasksDto): Observable<ITaskListResponse>;
  createTask(request: ICreateTaskDto): Observable<ITaskResponse>;
  updateTask(request: IUpdateTaskDto): Observable<ITaskResponse>;
  deleteTask(request: IFindOneTaskDto): Observable<ITaskResponse>;
}

export interface ITaskServiceController {
  findOneTask(
    request: IFindOneTaskDto,
  ): Promise<ITaskResponse> | Observable<ITaskResponse> | ITaskResponse;
  findAllTasks(
    request: IFindAllTasksDto,
  ): Promise<ITaskListResponse> | Observable<ITaskListResponse>;
  createTask(
    request: ICreateTaskDto,
  ): Promise<ITaskResponse> | Observable<ITaskResponse>;
  updateTask(
    request: IUpdateTaskDto,
  ): Promise<ITaskResponse> | Observable<ITaskResponse>;
  deleteTask(
    request: IFindOneTaskDto,
  ): Promise<ITaskResponse> | Observable<ITaskResponse>;
}
export interface TaskCategoryServiceController {
  findOneTaskCategory(
    request: IFindOneTaskCategoryDto,
  ):
    | Promise<ITaskCategoryResponse>
    | Observable<ITaskCategoryResponse>
    | ITaskCategoryResponse;

  findAllTaskCategories(
    request: IFindAllTaskCategoriesDto,
  ):
    | Promise<ITaskCategoryListResponse>
    | Observable<ITaskCategoryListResponse>
    | ITaskCategoryListResponse;
  createTaskCategory(
    request: ICreateTaskCategoryDto,
  ): Promise<ITaskCategoryResponse> | Observable<ITaskCategoryResponse>;
  updateTaskCategory(
    request: IUpdateTaskCategoryDto,
  ): Promise<ITaskCategoryResponse> | Observable<ITaskCategoryResponse>;
  deleteTaskCategory(
    request: IFindOneTaskCategoryDto,
  ): Promise<ITaskCategoryResponse> | Observable<ITaskCategoryResponse>;
  restoreTaskCategory(
    request: IRestoreTaskCategoryDto,
  ): Promise<ITaskCategoryResponse> | Observable<ITaskCategoryResponse>;
}

export const TASK_CATEGORY_SERVICE_NAME = 'TaskCategoryService';
export const TASK_SERVICE_NAME = 'TaskService';
export function TaskCategoryServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'findOneTaskCategory',
      'findAllTaskCategories',
      'createTaskCategory',
      'updateTaskCategory',
      'deleteTaskCategory',
      'restoreTaskCategory',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod(TASK_CATEGORY_SERVICE_NAME, method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}
export function TaskServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'findOneTask',
      'findAllTasks',
      'createTask',
      'updateTask',
      'deleteTask',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod(TASK_SERVICE_NAME, method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}
