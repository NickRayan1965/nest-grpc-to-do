import { ITaskCategory } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TaskCategoryDocument = HydratedDocument<TaskCategory>;
@Schema({ versionKey: false })
export class TaskCategory implements ITaskCategory {
  _id: string | Types.ObjectId;

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
    index: true,
  })
  userId: string;
}
export const TaskCategorySchema = SchemaFactory.createForClass(TaskCategory);
TaskCategorySchema.index({ name: 1, userId: 1 }, { unique: true });
