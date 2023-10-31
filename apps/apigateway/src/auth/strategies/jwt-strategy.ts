import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  Injectable,
  UnauthorizedException,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { ConfigType } from '@nestjs/config';
import { isUUID } from 'class-validator';
import jwtConfig from '../../config/jwt.config';
import { AUTH_SERVICE } from '../../modules/user/constants';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { IUser, USERS_SERVICE_NAME, UsersServiceClient } from '@app/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JwtStrategy
  extends PassportStrategy(Strategy)
  implements OnModuleInit
{
  private userService: UsersServiceClient;
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly client: ClientGrpc,
    @Inject(jwtConfig.KEY)
    readonly jwtConfigService: ConfigType<typeof jwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfigService.secret,
    });
  }
  onModuleInit() {
    this.userService =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  async validate(payload: IJwtPayload): Promise<IUser> {
    const { id } = payload;
    if (!isUUID(id)) {
      throw new UnauthorizedException('Invalid token');
    }
    return await this.checkUserOrThrow(id);
  }

  private async checkUserOrThrow(id: string): Promise<IUser> {
    try {
      return await firstValueFrom(this.userService.findOneUserForAuth({ id }));
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
