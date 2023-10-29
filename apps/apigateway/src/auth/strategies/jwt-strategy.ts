import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { ConfigType } from '@nestjs/config';
import { isUUID } from 'class-validator';
import jwtConfig from '../../config/jwt.config';
import { AUTH_SERVICE } from '../../modules/user/constants';
import { ClientGrpc } from '@nestjs/microservices';
import { IUser, USERS_SERVICE_NAME, UsersServiceClient } from '@app/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
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
    this.userService =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  async validate(payload: IJwtPayload): Promise<IUser> {
    const { id } = payload;
    if (!isUUID(id)) throw new UnauthorizedException('Invalid token');
    const user = await firstValueFrom(
      this.userService.findOneUserForAuth({ id }),
    );
    return user;
  }
}
