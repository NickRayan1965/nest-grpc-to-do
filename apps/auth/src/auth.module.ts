import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import EnvConfiguration from './config/config';
import { DataBaseModule } from './database/database.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      isGlobal: true,
    }),
    DataBaseModule,
    UsersModule,
    RoleModule,
  ],
  providers: [],
})
export class AuthModule {}
