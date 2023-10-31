import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [AuthModule, forwardRef(() => UserModule)],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
