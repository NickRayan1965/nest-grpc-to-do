import { registerAs } from '@nestjs/config';
import { prefix } from './prefix-vars.config';
import { IJwtConfig } from './interfaces/jwtConfig.interface';
export default registerAs(
  'jwtConfig',
  (): IJwtConfig => ({
    secret: process.env[`${prefix}JWT_SECRET`],
    expiresIn: process.env[`${prefix}JWT_EXPIRES_IN`],
  }),
);
