import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
})
export class RoleModule {}
