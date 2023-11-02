import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TODO_SERVICE } from './constants';
import { TODO_PACKAGE_NAME } from '@app/common';
import { join } from 'path';
import config from '../../config/config';
import { ConfigType } from '@nestjs/config';
import { AuthModule } from '../../auth/auth.module';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';
@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          inject: [config.KEY],
          name: TODO_SERVICE,
          useFactory(configService: ConfigType<typeof config>) {
            const { TODO_MICROSERVICE_URL } = configService.microservices;
            return {
              transport: Transport.GRPC,
              options: {
                url: TODO_MICROSERVICE_URL,
                package: TODO_PACKAGE_NAME,
                protoPath: join(__dirname, '../to-do.proto'),
              },
            };
          },
        },
      ],
    }),
    AuthModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class ToDoModule {}
