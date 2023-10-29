import { registerAs } from '@nestjs/config';
import { Config } from './interfaces/config.interface';
import { prefix } from './prefix-vars.config';
export default registerAs(
  'config',
  (): Config => ({
    database: {
      database: process.env[`${prefix}DB_DATABASE`],
      host: process.env[`${prefix}DB_HOST`],
      password: process.env[`${prefix}DB_PASSWORD`],
      port: +process.env[`${prefix}DB_PORT`],
      username: process.env[`${prefix}DB_USERNAME`],
    },
    query: {
      page: +process.env.PAGE,
      page_size: +process.env.PAGE_SIZE,
      min_page: 1,
    },
  }),
);
