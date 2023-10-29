import { ITaskCategory } from '@app/common';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TaskCategoryDocument = HydratedDocument<TaskCategory>;
export class TaskCategory implements ITaskCategory {
  @Prop({
    _id: true,
    type: Types.ObjectId,
  })
  id: string | Types.ObjectId;

  @Prop({
    required: true,
    type: String,
    maxlength: 50,
    minlength: 3,
  })
  name: string;

  @Prop({
    required: true,
    type: String,
  })
  userId: string;

  @Prop({
    required: true,
    type: Boolean,
    default: true,
  })
  isActive: boolean;
}
export const TaskCategorySchema = SchemaFactory.createForClass(TaskCategory);
