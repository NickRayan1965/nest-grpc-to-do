import { DbConfig } from './dbConfig.interface';
import { IMicroserviceOptions } from './microservices.interface';
import { QueryConfig } from './queryConfig.interface';

export interface Config {
  database: DbConfig;
  query: QueryConfig;
  microservices: IMicroserviceOptions;
}
