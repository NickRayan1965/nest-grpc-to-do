import { ValidationPipe } from '@nestjs/common';

export const validationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
  // skipMissingProperties: true,
});
