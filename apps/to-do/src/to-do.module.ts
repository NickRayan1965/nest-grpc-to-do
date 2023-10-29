import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import EnvConfiguration from '../src/config/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class ToDoModule {}
