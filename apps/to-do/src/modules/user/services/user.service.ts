import { USERS_SERVICE_NAME, UsersServiceClient } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AUTH_SERVICE } from '../constants';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class UserService implements OnModuleInit {
  private userService: UsersServiceClient;
  constructor(@Inject(AUTH_SERVICE) private readonly client: ClientGrpc) {}
  onModuleInit() {
    this.userService =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  findOneById(id: string) {
    return this.userService.findOneUser({ id });
  }
}
