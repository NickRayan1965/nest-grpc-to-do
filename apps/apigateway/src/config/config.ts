import { registerAs } from '@nestjs/config';
import { prefix } from './prefix-vars.config';
import { IConfig } from './interfaces/config.interface';
export default registerAs(
  'config',
  (): IConfig => ({
    microservices: {
      AUTH_MICROSERVICE_URL: process.env[`${prefix}AUTH_MICROSERVICE_URL`],
      TODO_MICROSERVICE_URL: process.env[`${prefix}TODO_MICROSERVICE_URL`],
    },
  }),
);
