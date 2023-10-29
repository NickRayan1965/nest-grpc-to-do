import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../config/config';
import { ConfigType } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { SeederOptions, runSeeders } from 'typeorm-extension';
import RoleSeeder from './seeders/role-seeder.seed';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const dbConfig = configService.database;
        return {
          type: 'postgres',
          ...dbConfig,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          autoLoadEntities: true,
          synchronize: true,
          dropSchema: true,
        };
      },
      dataSourceFactory: async (options) => {
        const dataSource: DataSource & SeederOptions = await new DataSource(
          options,
        ).initialize();
        await runSeeders(dataSource, {
          seeds: [RoleSeeder],
        });
        return dataSource;
      },
    }),
  ],
})
export class DataBaseModule {}
