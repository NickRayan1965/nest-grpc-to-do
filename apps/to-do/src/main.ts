import { NestFactory } from '@nestjs/core';
import { ToDoModule } from './to-do.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TODO_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const port = process.env.PORT || 8694;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ToDoModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../to-do.proto'),
        package: TODO_PACKAGE_NAME,
        url: `0.0.0.0:${port}`,
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
