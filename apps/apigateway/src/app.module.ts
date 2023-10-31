import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import config from './config/config';
import { ToDoModule } from './modules/to-do/to-do.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config, jwtConfig],
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    RoleModule,
    ToDoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
