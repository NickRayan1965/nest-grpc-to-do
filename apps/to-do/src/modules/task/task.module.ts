import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './entities/task.schema';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';
import { UserModule } from '../user/user.module';
import { TaskCategoryModule } from '../task-category/task-category.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    UserModule,
    forwardRef(() => TaskCategoryModule),
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService, MongooseModule],
})
export class TaskModule {}
