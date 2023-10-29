import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import EnvConfiguration from './config/config';
import { DataBaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      isGlobal: true,
    }),
    DataBaseModule,
    UsersModule,
  ],
  providers: [],
})
export class AuthModule {}
