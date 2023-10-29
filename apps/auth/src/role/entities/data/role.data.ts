import { IRole } from '@app/common';
import { RoleEnum } from '../enum/role.enum';

export const roles: Omit<IRole, 'id'>[] = [
  {
    name: RoleEnum.SUPER_ADMIN,
    description: 'Super admin role',
  },
  {
    name: RoleEnum.USER,
    description: 'User role',
  },
];
