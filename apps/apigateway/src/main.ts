import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validationPipe } from './config/validationPipeToTheApp';
import { RpcExceptionFilter } from './common/error/rcp-exception-filter.filter';
import { RcpErrorInterceptor } from './common/interceptors/rcp-error.interceptor';
import { SwaggerModule } from '@nestjs/swagger';
import { document } from './config/swagger.config';
const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(validationPipe);
  app.useGlobalFilters(new RpcExceptionFilter());
  app.useGlobalInterceptors(new RcpErrorInterceptor());
  const appDocument = document(app);
  SwaggerModule.setup('api', app, appDocument);
  await app.listen(port);
  console.log(`Application is running on port: ${port}`);
}
bootstrap();
