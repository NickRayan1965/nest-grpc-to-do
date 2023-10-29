import { USERS_SERVICE_NAME, UsersServiceClient } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AUTH_SERVICE } from '../constants';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateUserDto } from '../dtos/create/create-user.dto';
import { GetUsersQueryDto } from '../dtos/query/get-users-query.dto';
import { UpdateUserDto } from '../dtos/update/update-user.dto';

@Injectable()
export class UserService implements OnModuleInit {
  private userService: UsersServiceClient;
  constructor(@Inject(AUTH_SERVICE) private client: ClientGrpc) {}
  onModuleInit() {
    this.userService =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }
  create(dto: CreateUserDto) {
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
