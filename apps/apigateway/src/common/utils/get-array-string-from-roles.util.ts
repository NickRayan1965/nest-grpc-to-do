import { RoleEnum } from 'apps/auth/src/role/entities/enum/role.enum';

export const getArrayStringFromRoles = (roles: RoleEnum[]) => {
  return '[' + roles.map((role) => `'${role}'`).join(', ') + ']';
};
