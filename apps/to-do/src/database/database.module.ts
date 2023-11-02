import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from '../config/config';
import { ConfigType } from '@nestjs/config';
import { DatabaseSevice } from './services/database.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { database } = configService;
        const uri = `${database.prefix_connection}://${database.host}:${database.port}`;
        return {
          dbName: database.database,
          autoCreate: true,
          auth: {
            username: database.username,
            password: database.password,
          },
          uri,
          family: 4,
        };
      },
    }),
  ],
  providers: [DatabaseSevice],
  exports: [DatabaseSevice],
})
export class DatabaseModule {}
