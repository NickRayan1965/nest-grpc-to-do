import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from './constants';
import { AUTH_PACKAGE_NAME } from '@app/common';
import { join } from 'path';
import config from '../../config/config';
import { ConfigType } from '@nestjs/config';
import { UserService } from './services/user.service';

@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          inject: [config.KEY],
          name: AUTH_SERVICE,
          useFactory: (configService: ConfigType<typeof config>) => {
            const { AUTH_MICROSERVICE_URL } = configService.microservices;
            return {
              transport: Transport.GRPC,
              options: {
                package: AUTH_PACKAGE_NAME,
                protoPath: join(__dirname, '../auth.proto'),
                url: AUTH_MICROSERVICE_URL,
              },
            };
          },
        },
      ],
    }),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
