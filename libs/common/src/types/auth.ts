/* eslint-disable @typescript-eslint/ban-types */
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import BooleanString from '../interfaces/boolean-string.interface';
import { RoleEnum } from 'apps/auth/src/role/entities/enum/role.enum';

export const protobufPackage = 'auth';

export interface IPaginationDto {
  page?: number;
  page_size?: number;
  relations?: BooleanString;
}

export interface IUpdateUserDto {
  id: string;
  username?: string;
  password?: string;
  roleIds?: string[];
}

export interface IFindOneUserDto {
  id: string;
  relations?: boolean;
}
export interface IFindOneUserByIdDto {
  id: string;
}

export interface Empty {}

export interface IUsers {
  users: IUser[];
}

export interface ICreateUserDto {
  username: string;
  password: string;
  roleIds?: string[];
}

//entities
export interface IUser {
  id: string;
  username: string;
  password: string;
  isActive: boolean;
  roles: IRole[];
}
export interface IRole {
  id: string;
  name: RoleEnum;
  description: string;
  users: IUser[];
}
//

export interface IFindOneRoleByIdDto {
  id: string;
}

export interface IRoles {
  roles: IRole[];
}

export interface ILoginDto {
  username: string;
  password: string;
}

export const AUTH_PACKAGE_NAME = 'auth';

export interface UsersServiceClient {
  createUser(request: ICreateUserDto): Observable<IUser>;

  findAllUsers(request: IPaginationDto): Observable<IUsers>;

  findOneUser(request: IFindOneUserDto): Observable<IUser>;

  updateUser(request: IUpdateUserDto): Observable<IUser>;

  removeUser(request: IFindOneUserDto): Observable<IUser>;

  findOneUserForAuth(request: IFindOneUserByIdDto): Observable<IUser>;

  login(request: ILoginDto): Observable<IUser>;
}
export interface RolesServiceClient {
  findAllRoles(request: Empty): Observable<IRoles>;
  findOneRole(request: IFindOneRoleByIdDto): Observable<IRole>;
}

export interface UsersServiceController {
  createUser(
    request: ICreateUserDto,
  ): Promise<IUser> | Observable<IUser> | IUser;

  findAllUsers(
    request: IPaginationDto,
  ): Promise<IUsers> | Observable<IUsers> | IUsers;

  findOneUser(
    request: IFindOneUserDto,
  ): Promise<IUser> | Observable<IUser> | IUser;

  updateUser(
    request: IUpdateUserDto,
  ): Promise<IUser> | Observable<IUser> | IUser;

  removeUser(
    request: IFindOneUserDto,
  ): Promise<IUser> | Observable<IUser> | IUser;
  findOneUserForAuth(
    request: IFindOneUserByIdDto,
  ): Promise<IUser> | Observable<IUser> | IUser;
  login(request: ILoginDto): Promise<IUser> | Observable<IUser> | IUser;
}
export interface RolesServiceController {
  findAllRoles(request: Empty): Promise<IRoles> | Observable<IRoles> | IRoles;

  findOneRole(
    request: IFindOneRoleByIdDto,
  ): Promise<IRole> | Observable<IRole> | IRole;
}
export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createUser',
      'findAllUsers',
      'findOneUser',
      'updateUser',
      'removeUser',
      'findOneUserForAuth',
      'login',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('UserService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}
export function RolesServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['findAllRoles', 'findOneRole'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('RoleService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}
export const USERS_SERVICE_NAME = 'UserService';
export const ROLES_SERVICE_NAME = 'RoleService';
