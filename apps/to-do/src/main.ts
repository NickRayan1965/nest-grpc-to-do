import { NestFactory } from '@nestjs/core';
import { ToDoModule } from './to-do.module';

async function bootstrap() {
  const app = await NestFactory.create(ToDoModule);
  await app.listen(3000);
}
bootstrap();
