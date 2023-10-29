import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleEnum } from 'apps/auth/src/role/entities/enum/role.enum';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { IUser } from '@app/common';
export const validateRoles = (roles: RoleEnum[], user: IUser) => {
  if (!user) throw new InternalServerErrorException('User not found (request)');
  const userRoles = user.roles.map((role) => role.name);
  const hasAccess = roles.some((elemento) => userRoles.includes(elemento));
  if (!hasAccess)
    throw new ForbiddenException(
      `User with id '${user.id}' does not have required roles`,
    );
};
@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: RoleEnum[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );
    const adminPermits = [RoleEnum.SUPER_ADMIN];
    validRoles.push(...adminPermits);
    if (!validRoles || !validRoles.length) return true;
    const user = context.switchToHttp().getRequest().user as IUser;
    validateRoles(validRoles, user);
    return true;
  }
}
