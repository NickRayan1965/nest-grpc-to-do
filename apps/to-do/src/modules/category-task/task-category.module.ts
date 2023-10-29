import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TaskCategory,
  TaskCategorySchema,
} from './entities/task-category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskCategory.name, schema: TaskCategorySchema },
    ]),
  ],
})
export class TaskCategoryModule {}
