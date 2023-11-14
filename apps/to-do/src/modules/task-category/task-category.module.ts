import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TaskCategory,
  TaskCategorySchema,
} from './entities/task-category.schema';
import { UserModule } from '../user/user.module';
import { TaskCategoryService } from './services/task-category.service';
import { TaskCategoryController } from './controller/task-category.controller';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskCategory.name, schema: TaskCategorySchema },
    ]),
    UserModule,
    forwardRef(() => TaskModule),
  ],
  providers: [TaskCategoryService],
  exports: [TaskCategoryService],
  controllers: [TaskCategoryController],
})
export class TaskCategoryModule {}
