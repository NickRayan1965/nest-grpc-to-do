import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validationPipe } from './config/validationPipeToTheApp';
import { RpcExceptionFilter } from './common/error/rcp-exception-filter.filter';
import { RcpErrorInterceptor } from './common/interceptors/rcp-error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(validationPipe);
  app.useGlobalFilters(new RpcExceptionFilter());
  app.useGlobalInterceptors(new RcpErrorInterceptor());
  await app.listen(3000);
}
bootstrap();
