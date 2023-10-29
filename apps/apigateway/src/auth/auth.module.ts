import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt-strategy';
import { UserModule } from '../modules/user/user.module';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      inject: [jwtConfig.KEY],
      useFactory: (jwtConfigService: ConfigType<typeof jwtConfig>) => {
        return {
          secret: jwtConfigService.secret,
          signOptions: {
            expiresIn: jwtConfigService.expiresIn,
          },
        };
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtStrategy, AuthService],
})
export class AuthModule {}
