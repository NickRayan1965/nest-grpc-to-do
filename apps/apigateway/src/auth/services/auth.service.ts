import { USERS_SERVICE_NAME, UsersServiceClient } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AUTH_SERVICE } from '../../modules/user/constants';
import { ClientGrpc } from '@nestjs/microservices';
import { LoginDto } from '../dtos/login.dto';
import { firstValueFrom } from 'rxjs';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from '../dtos/login-response.dto';

@Injectable()
export class AuthService implements OnModuleInit {
  private userService: UsersServiceClient;
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly client: ClientGrpc,
    private readonly jwtService: JwtService,
  ) {}
  onModuleInit() {
    this.userService =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }
  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await firstValueFrom(this.userService.login(loginDto));
    return {
      user,
      jwt: this.getJwt({ id: user.id }),
    };
  }
  private getJwt(payload: IJwtPayload): string {
    return this.jwtService.sign(payload);
  }
}
