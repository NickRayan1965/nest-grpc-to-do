import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from 'apps/auth/src/role/entities/enum/role.enum';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: RoleEnum[]) => {
  return SetMetadata(META_ROLES, args);
};
