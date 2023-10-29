import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TaskCategory,
  TaskCategorySchema,
} from './entities/task-category.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskCategory.name, schema: TaskCategorySchema },
    ]),
    UserModule,
  ],
})
export class TaskCategoryModule {}
