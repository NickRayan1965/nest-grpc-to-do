import { ROLES_SERVICE_NAME, RolesServiceClient } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AUTH_SERVICE } from '../../user/constants';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class RoleService implements OnModuleInit {
  private roleService: RolesServiceClient;
  constructor(@Inject(AUTH_SERVICE) private readonly client: ClientGrpc) {}
  onModuleInit() {
    this.roleService =
      this.client.getService<RolesServiceClient>(ROLES_SERVICE_NAME);
  }
  async findAll() {
    this.roleService.findAllRoles({});
  }
  findOne(id: string) {
    return this.roleService.findOneRole({ id });
  }
}
