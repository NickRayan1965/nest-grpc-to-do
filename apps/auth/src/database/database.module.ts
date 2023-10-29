import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../config/config';
import { ConfigType } from '@nestjs/config';

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
    }),
  ],
})
export class DataBaseModule {}
