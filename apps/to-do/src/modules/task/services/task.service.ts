import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from '../entities/task.schema';
import { Model, PipelineStage } from 'mongoose';
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
import { TaskCategory } from '../../task-category/entities/task-category.schema';
import pipeLinesStageToFilterNamesComplexly from 'apps/to-do/src/database/pipes/names_filter_complex';
import { FindTasksResultAgregation } from '../interfaces/find-tasks-result.interface';
const entityName = Task.name;
@Injectable()
export class TaskService {
  constructor(
    @InjectModel(entityName) private readonly taskModel: Model<TaskDocument>,
    private readonly userService: UserService,
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
  async findOneById({ id, userId }: IFindOneTaskDto) {
    const task = await this.taskModel.findOne({ id, userId });
    if (!task)
      throw new RpcNotFoundException(
        'Task with id' + id + 'not found for user with id' + userId,
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
      categoryIds,
      expiration,
      filterByContent,
      priority,
      status,
    } = findAllTaskDto;
    const matchPipeline: PipelineStage = {
      $match: {
        userId,
        expiration,
        priority,
        status,
      },
    };
    const paginationPipeline: PipelineStage = {
      $limit: pageSize,
      $skip: (page - query.min_page) * pageSize,
    };
    const {
      pipeLineStagesOfRelation: pipeLineStagesOfRelationOfCategories,
      matchPipeline: matchPipelineOfCategories,
    } = pipelineStageToConnectToNestedObject({
      from: TaskCategory.name,
      as: 'categories',
      localField: 'categories',
      foreignField: 'id',
      matchIds: categoryIds,
    });
    const filterByContentPipelines: PipelineStage[] =
      pipeLinesStageToFilterNamesComplexly<Task>({
        expression: filterByContent,
        fieldsToConcat: ['name', 'description'],
      });
    const pipelineStages: PipelineStage[] = [
      matchPipeline,
      ...pipeLineStagesOfRelationOfCategories,
      matchPipelineOfCategories,
      ...filterByContentPipelines,
      paginationPipeline,
    ];

    const [result]: FindTasksResultAgregation[] =
      await this.taskModel.aggregate([
        {
          $facet: {
            data: pipelineStages as PipelineStage.FacetPipelineStage[],
            totalCount: [
              matchPipeline,
              ...(pipeLineStagesOfRelationOfCategories as PipelineStage.FacetPipelineStage[]),
              matchPipelineOfCategories,
              {
                $count: 'total_count',
              },
            ],
          },
        },
      ]);
    console.log({ result: JSON.stringify(result) });
    return buildResponse<ITaskListResponse>({
      data: result.data,
      status: HttpStatus.OK,
      pagination: {
        total_count: result.totalCount.total_count ?? 0,
      },
    });
  }
  async update({ id, userId, ...rest }: IUpdateTaskDto) {
    const { data } = await this.findOneById({ id, userId });
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
    await this.taskModel.deleteOne({ id: data.id });
    return buildResponse<ITaskResponse>({
      data,
      status: HttpStatus.OK,
    });
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
    return new this.taskModel({
      userId,
      categories,
      ...rest,
    });
  }
}
