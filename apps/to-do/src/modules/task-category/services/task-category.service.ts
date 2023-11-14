import { HttpStatus, Injectable } from '@nestjs/common';
import {
  TaskCategory,
  TaskCategoryDocument,
} from '../entities/task-category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import {
  ICreateTaskCategoryDto,
  IFindAllTaskCategoriesDto,
  IFindOneTaskCategoryDto,
  ITaskCategoryListResponse,
  ITaskCategoryResponse,
  IUpdateTaskCategoryDto,
} from '@app/common';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../user/services/user.service';
import { handleExceptions } from 'apps/to-do/src/common/errors/handle-exceptions';
import { buildResponse } from 'apps/to-do/src/common/utils/build-response.util';
import { RpcNotFoundException } from 'apps/auth/src/common/errors/rcp-exception.exception';
import { TaskService } from '../../task/services/task.service';
import { toJson } from 'apps/to-do/src/common/utils/to-json.util';
const entityName = TaskCategory.name;
@Injectable()
export class TaskCategoryService {
  constructor(
    @InjectModel(entityName)
    private readonly taskCategoryModel: Model<TaskCategoryDocument>,
    private readonly taskService: TaskService,
    private readonly userService: UserService,
  ) {}

  async create(
    createTaskCategoryDto: ICreateTaskCategoryDto,
  ): Promise<ITaskCategoryResponse> {
    const { userId, ...data } = createTaskCategoryDto;
    const user = await firstValueFrom(this.userService.findOneById(userId));
    try {
      const taskCategory = await new this.taskCategoryModel({
        ...data,
        userId: user.id,
      }).save();
      return buildResponse<ITaskCategoryResponse>({
        status: HttpStatus.CREATED,
        data: taskCategory,
      });
    } catch (error) {
      handleExceptions(error, entityName);
    }
  }

  async findAll(
    findAllOptionsDto: IFindAllTaskCategoriesDto,
  ): Promise<ITaskCategoryListResponse> {
    const { name, userId } = findAllOptionsDto;
    await firstValueFrom(this.userService.findOneById(userId));
    const query: FilterQuery<TaskCategory> = {
      name: name ? { $regex: name, $options: 'i' } : undefined,
      userId,
    };
    const taskCategories = await this.taskCategoryModel
      .find(toJson(query))
      .exec();
    return buildResponse<ITaskCategoryListResponse>({
      data: taskCategories,
      status: HttpStatus.OK,
      pagination: {
        total_count: taskCategories.length,
      },
    });
  }
  async findOneById({ id, userId }: IFindOneTaskCategoryDto) {
    const taskCategory = await this.taskCategoryModel.findOne({
      _id: id,
      userId,
    });
    if (!taskCategory) {
      throw new RpcNotFoundException(
        `Taks category with id ${id} and userId ${userId} not found`,
      );
    }
    return buildResponse<ITaskCategoryResponse>({
      data: taskCategory,
      status: HttpStatus.OK,
    });
  }
  async updateOneById({ id, userId, ...dto }: IUpdateTaskCategoryDto) {
    const { data } = await this.findOneById({ id, userId });
    try {
      const taskCategoryUpdated = await this.taskCategoryModel.findOneAndUpdate(
        { id },
        { ...data, ...dto },
        { new: true },
      );
      return buildResponse<ITaskCategoryResponse>({
        data: taskCategoryUpdated,
        status: HttpStatus.OK,
      });
    } catch (error) {
      handleExceptions(error, entityName);
    }
  }
  async deleteOneById({ id, userId }: IFindOneTaskCategoryDto) {
    await this.findOneById({ id, userId });
    const taskCategoryDeleted =
      await this.taskCategoryModel.findByIdAndRemove(id);
    await this.taskService.removeCategoryFromTasks(id);
    return buildResponse<ITaskCategoryResponse>({
      data: taskCategoryDeleted,
      status: HttpStatus.OK,
    });
  }
  async restoreOneById({ id, userId }: IFindOneTaskCategoryDto) {
    await this.findOneById({ id, userId });
    const taskCategoryRestored = await this.taskCategoryModel.findOneAndUpdate(
      { id },
      { isActive: true },
      { new: true },
    );
    return buildResponse<ITaskCategoryResponse>({
      data: taskCategoryRestored,
      status: HttpStatus.OK,
    });
  }
}
