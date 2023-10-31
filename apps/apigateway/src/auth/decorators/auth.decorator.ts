import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from './role-protected.decorator';
import { RoleEnum } from 'apps/auth/src/role/entities/enum/role.enum';
import { UserRoleGuard } from '../guards/user-role.guard';

export function Auth(...roles: RoleEnum[]) {
  //extensible decorator

  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
