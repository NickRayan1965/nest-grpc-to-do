import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { TaskPriorityEnum } from './enum/task-priority.enum';
import { TaskCategory } from '../../task-category/entities/task-category.schema';
import { TaskStatusEnum } from './enum/task-status.enum';
import { ITask } from '@app/common';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ versionKey: false })
export class Task implements ITask {
  @Prop({
    _id: true,
    type: Types.ObjectId,
  })
  id: string | Types.ObjectId;

  @Prop({
    required: true,
    type: String,
  })
  userId: string;

  @Prop({
    required: true,
    type: String,
    maxlength: 50,
    minlength: 3,
  })
  name: string;

  @Prop({
    required: false,
    type: String,
    maxlength: 500,
  })
  description: string;

  //vencimiento
  @Prop({
    required: true,
    type: String,
  })
  expiration: string;

  @Prop({
    required: true,
    type: Date,
    default: Date.now,
    transform: (v: string) => new Date(v),
    parse: (v: Date) => v.toISOString(),
  })
  createdAt: string;

  @Prop({
    type: String,
    enum: TaskPriorityEnum,
    required: true,
  })
  priority: TaskPriorityEnum;

  @Prop({
    type: String,
    enum: TaskStatusEnum,
    required: true,
    default: TaskStatusEnum.PENDING,
  })
  status: TaskStatusEnum;

  @Prop({
    ref: TaskCategory.name,
    type: [Types.ObjectId],
  })
  categories: TaskCategory[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
