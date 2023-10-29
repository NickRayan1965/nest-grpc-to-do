import { DbConfig } from './dbConfig.interface';
import { QueryConfig } from './queryConfig.interface';

export interface Config {
  database: DbConfig;
  query: QueryConfig;
}
