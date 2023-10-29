import * as dotenv from 'dotenv';
import { Envs } from './interfaces/envs.config.enum';
dotenv.config({
  path: './apps/apigateway/.env',
});
export const prefix = Envs[process.env.NODE_ENV] ?? Envs.development;
