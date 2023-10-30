import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
