import { USERS_SERVICE_NAME, UsersServiceClient } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AUTH_SERVICE } from '../constants';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateUserAsAdminDto,
  CreateUserDto,
} from '../dtos/create/create-user.dto';
import { GetUsersQueryDto } from '../dtos/query/get-users-query.dto';
import { UpdateUserDto } from '../dtos/update/update-user.dto';
import { RoleService } from '../../role/services/role.service';
import { firstValueFrom } from 'rxjs';
import { RoleEnum } from 'apps/auth/src/role/entities/enum/role.enum';

@Injectable()
export class UserService implements OnModuleInit {
  private userService: UsersServiceClient;
  constructor(
    @Inject(AUTH_SERVICE) private client: ClientGrpc,
    private readonly roleService: RoleService,
  ) {}
  onModuleInit() {
    this.userService =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }
  async create(dto: CreateUserDto) {
    const defaultRole = await firstValueFrom(
      this.roleService.findOneByName(RoleEnum.USER),
    );
    return this.userService.createUser({ ...dto, roleIds: [defaultRole.id] });
  }

  createAsAdmin(dto: CreateUserAsAdminDto) {
    return this.userService.createUser(dto);
  }
  async findAll(queryParams: GetUsersQueryDto) {
    return this.userService.findAllUsers(queryParams);
  }
  async findOne(id: string) {
    return this.userService.findOneUser({ id });
  }
  async update(id: string, dto: UpdateUserDto) {
    return this.userService.updateUser({ id, ...dto });
  }
  async remove(id: string) {
    return this.userService.removeUser({ id });
  }
}
