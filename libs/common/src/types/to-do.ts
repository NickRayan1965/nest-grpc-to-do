/* eslint-disable @typescript-eslint/ban-types */
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import BooleanString from '../interfaces/boolean-string.interface';
import { Types } from 'mongoose';

export const protobufPackageTaskCategory = 'taskcategory';

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
      GrpcMethod('TaskCategoryService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const TASK_CATEGORY_SERVICE_NAME = 'TaskCategoryService';
