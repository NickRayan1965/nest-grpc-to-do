import { HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from '../entities/task.schema';
import { Model, PipelineStage, Types } from 'mongoose';
import {
  ICreateTaskDto,
  IFindAllTasksDto,
  IFindOneTaskDto,
  ITaskListResponse,
  ITaskResponse,
  IUpdateTaskDto,
} from '@app/common';
import { UserService } from '../../user/services/user.service';
import { TaskCategoryService } from '../../task-category/services/task-category.service';
import { firstValueFrom } from 'rxjs';
import { handleExceptions } from 'apps/to-do/src/common/errors/handle-exceptions';
import { RpcNotFoundException } from 'apps/auth/src/common/errors/rcp-exception.exception';
import { buildResponse } from 'apps/to-do/src/common/utils/build-response.util';
import config from 'apps/to-do/src/config/config';
import { ConfigType } from '@nestjs/config';
import pipelineStageToConnectToNestedObject from 'apps/to-do/src/database/pipes/func_connect_mongo_object_to_nested_object_with_fk';
import pipeLinesStageToFilterNamesComplexly from 'apps/to-do/src/database/pipes/names_filter_complex';
import { toJson } from 'apps/to-do/src/common/utils/to-json.util';
import { getPaginationPipelines } from 'apps/to-do/src/common/utils/get-pagination-pipelines.util';
const entityName = Task.name;
@Injectable()
export class TaskService {
  constructor(
    @InjectModel(entityName) private readonly taskModel: Model<TaskDocument>,
    private readonly userService: UserService,
    @Inject(forwardRef(() => TaskCategoryService))
    private readonly taskCategoryService: TaskCategoryService,
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {}

  async create(dto: ICreateTaskDto) {
    const task = await this.getAndValidateTaskDto(dto);
    try {
      const taskCreated = await task.save();
      return buildResponse<ITaskResponse>({
        data: taskCreated,
        status: HttpStatus.CREATED,
      });
    } catch (error) {
      handleExceptions(error, entityName);
    }
  }
  async findOneById({ _id, userId }: IFindOneTaskDto) {
    const task = await this.taskModel.findOne({ _id, userId });
    if (!task)
      throw new RpcNotFoundException(
        'Task with id ' + _id + 'not found for user with id ' + userId,
      );
    return buildResponse<ITaskResponse>({
      data: task,
      status: HttpStatus.OK,
    });
  }

  async findAll(findAllTaskDto: IFindAllTasksDto) {
    const { query } = this.configService;
    const {
      userId,
      page = query.page,
      pageSize = query.page_size,
      // categoryIds,
      expiration,
      filterByContent,
      priority,
      status,
      categoryIds,
    } = findAllTaskDto;
    const matchPipeline = toJson({
      $match: {
        userId,
        expiration,
        priority,
        status,
      },
    });
    const filterByContentPipelines: PipelineStage[] =
      pipeLinesStageToFilterNamesComplexly<Task>({
        expression: filterByContent,
        fieldsToConcat: ['name', 'description'],
      });
    const {
      pipeLineStagesOfRelation: pipeLineStagesOfRelationOfCategories,
      matchPipeline: matchPipelineOfCategories,
    } = pipelineStageToConnectToNestedObject({
      from: 'taskcategories',
      as: 'categories',
      localField: 'categories',
      foreignField: '_id',
      many: true,
      matchIds: categoryIds,
    });

    const result = await this.taskModel
      .aggregate([
        matchPipeline,
        ...pipeLineStagesOfRelationOfCategories,
        ...filterByContentPipelines,
        ...(matchPipelineOfCategories ? [matchPipelineOfCategories] : []),
        {
          $facet: {
            data: [
              ...getPaginationPipelines({
                page,
                pageSize,
                minPage: query.min_page,
              }),
            ],
            totalCount: [
              {
                $count: 'total_count',
              },
            ],
          },
        },
      ])
      .exec();
    return buildResponse<ITaskListResponse>({
      data: result[0].data,
      status: HttpStatus.OK,
      pagination: {
        total_count: result[0].totalCount[0]?.total_count ?? 0,
      },
    });
  }
  async update({ _id, userId, ...rest }: IUpdateTaskDto) {
    const { data } = await this.findOneById({ _id, userId });
    const dtoValidated = await this.getAndValidateTaskDto({
      userId,
      ...rest,
    });
    const task = new this.taskModel(data).set(dtoValidated.toObject());
    try {
      const taskUpdated = await task.save();
      return buildResponse<ITaskResponse>({
        data: taskUpdated,
        status: HttpStatus.OK,
      });
    } catch (error) {
      handleExceptions(error, entityName);
    }
  }

  async delete(findOneTaskDto: IFindOneTaskDto) {
    const { data } = await this.findOneById(findOneTaskDto);
    await this.taskModel.deleteOne({ _id: data._id });
    return buildResponse<ITaskResponse>({
      data,
      status: HttpStatus.OK,
    });
  }
  async removeCategoryFromTasks(categoryId: string) {
    await this.taskModel.updateMany(
      { categories: categoryId },
      { $pull: { categories: new Types.ObjectId(categoryId) } },
    );
  }
  async getAndValidateTaskDto(
    dto: Partial<ICreateTaskDto | IUpdateTaskDto> = {},
  ) {
    const { categoryIds = [], userId, ...rest } = dto;
    const categoryPromises = Promise.all(
      categoryIds.map((id) =>
        this.taskCategoryService.findOneById({ id, userId }),
      ),
    );
    const [, categories] = await Promise.all([
      userId ? firstValueFrom(this.userService.findOneById(userId)) : undefined,
      categoryIds.length ? categoryPromises : undefined,
    ]);
    const a = categories?.map(({ data: category }) => category._id.toString());
    console.log({ a });
    return new this.taskModel({
      userId,
      categories: a,
      ...rest,
    });
  }
}
