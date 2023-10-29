import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';

@Module({
  imports: [UserModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
