import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import EnvConfiguration from '../src/config/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { TaskCategoryModule } from './modules/task-category/task-category.module';
import { TaskModule } from './modules/task/task.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    TaskModule,
    TaskCategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class ToDoModule {}
