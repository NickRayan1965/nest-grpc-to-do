import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
export const title_app = 'ToDo ApiGateway';
export const config = new DocumentBuilder()
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    in: 'header',
  })
  .setTitle(title_app)
  .setVersion('1.0')
  .build();
export const document = (nestApp: INestApplication) =>
  SwaggerModule.createDocument(nestApp, config);
