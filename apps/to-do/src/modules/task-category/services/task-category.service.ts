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
const entityName = TaskCategory.name;
@Injectable()
export class TaskCategoryService {
  constructor(
    @InjectModel(entityName)
    private readonly taskCategoryModel: Model<TaskCategoryDocument>,
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
    const { name, isActive, userId } = findAllOptionsDto;
    await firstValueFrom(this.userService.findOneById(userId));
    const query: FilterQuery<TaskCategory> = {
      name: { $regex: name, $options: 'i' },
      isActive,
      userId,
    };
    const taskCategories = await this.taskCategoryModel.find(query);
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
      id,
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
    const taskCategoryDeleted = await this.taskCategoryModel.findOneAndUpdate(
      { id },
      { isActive: false },
      { new: true },
    );
    return buildResponse<ITaskCategoryResponse>({
      data: taskCategoryDeleted,
      status: HttpStatus.OK,
    });
  }
}
