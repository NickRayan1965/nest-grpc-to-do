import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from './constants';
import { AUTH_PACKAGE_NAME } from '@app/common';
import { join } from 'path';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { AuthModule } from '../../auth/auth.module';
import { RoleModule } from '../role/role.module';
import config from '../../config/config';
import { ConfigType } from '@nestjs/config';
@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          inject: [config.KEY],
          name: AUTH_SERVICE,
          useFactory(configService: ConfigType<typeof config>) {
            const { AUTH_MICROSERVICE_URL } = configService.microservices;
            return {
              transport: Transport.GRPC,
              options: {
                url: AUTH_MICROSERVICE_URL,
                package: AUTH_PACKAGE_NAME,
                protoPath: join(__dirname, '../auth.proto'),
              },
            };
          },
        },
      ],
    }),
    AuthModule,
    RoleModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [ClientsModule],
})
export class UserModule {}
