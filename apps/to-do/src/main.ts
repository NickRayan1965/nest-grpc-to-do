import { NestFactory } from '@nestjs/core';
import { ToDoModule } from './to-do.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TASK_CATEGORY_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const port = process.env.PORT || 8694;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ToDoModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../task-category.proto'),
        package: TASK_CATEGORY_PACKAGE_NAME,
        //puerto 4500
        //url: '0.0.0.0:4500',
        url: `0.0.0.0:${process.env.PORT}`,
        loader: {
          keepCase: true,
        },
      },
    },
  );
  await app.listen();
  console.log(`Microservice is listening on port ${port}`);
}
bootstrap();
