import {
  IFindOneRoleByIdDto,
  IFindOneRoleByNameDto,
  IRole,
  IRoles,
  RolesServiceController,
  RolesServiceControllerMethods,
} from '@app/common';
import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleService } from '../services/role.service';

@Controller()
@RolesServiceControllerMethods()
export class RoleController implements RolesServiceController {
  constructor(private readonly roleService: RoleService) {}
  findOneRoleByName({
    name,
  }: IFindOneRoleByNameDto): IRole | Observable<IRole> | Promise<IRole> {
    return this.roleService.findOneByName(name);
  }
  findAllRoles(): IRoles | Promise<IRoles> | Observable<IRoles> {
    return this.roleService.findAll();
  }
  findOneRole(
    request: IFindOneRoleByIdDto,
  ): IRole | Observable<IRole> | Promise<IRole> {
    return this.roleService.findOneById(request.id);
  }
}
