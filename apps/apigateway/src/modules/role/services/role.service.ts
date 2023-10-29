import { ROLES_SERVICE_NAME, RolesServiceClient } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AUTH_SERVICE } from '../../user/constants';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RoleService implements OnModuleInit {
  private roleService: RolesServiceClient;
  constructor(@Inject(AUTH_SERVICE) private readonly client: ClientGrpc) {}
  onModuleInit() {
    this.roleService =
      this.client.getService<RolesServiceClient>(ROLES_SERVICE_NAME);
  }
  async findAll() {
    try {
      const { roles } = await firstValueFrom(this.roleService.findAllRoles({}));
      console.log(roles);
      return roles;
    } catch (error) {
      console.log(error);
    }
    //return this.roleService.findAllRoles({});
  }
  findOne(id: string) {
    return this.roleService.findOneRole({ id });
  }
}
