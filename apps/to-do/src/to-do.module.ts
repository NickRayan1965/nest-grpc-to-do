import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import EnvConfiguration from '../src/config/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { TaskCategoryModule } from './modules/task-category/task-category.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    TaskCategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class ToDoModule {}
