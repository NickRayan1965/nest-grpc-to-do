import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import EnvConfiguration from '../src/config/config';
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      isGlobal: true,
    }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class ToDoModule {}
