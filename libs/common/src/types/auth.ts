/* eslint-disable @typescript-eslint/ban-types */
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import BooleanString from '../interfaces/boolean-string.interface';

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
}

export interface IFindOneUserDto {
  id: string;
  relations?: boolean;
}
export interface IFindOneUserByIdDto {
  id: string;
}

export interface Empty {}

export interface Users {
  users: IUser[];
}

export interface ICreateUserDto {
  username: string;
  password: string;
}

export interface IUser {
  id: string;
  username: string;
  password: string;
  isActive: boolean;
}
export interface ILoginDto {
  username: string;
  password: string;
}

export const AUTH_PACKAGE_NAME = 'auth';

export interface UsersServiceClient {
  createUser(request: ICreateUserDto): Observable<IUser>;

  findAllUsers(request: IPaginationDto): Observable<Users>;

  findOneUser(request: IFindOneUserDto): Observable<IUser>;

  updateUser(request: IUpdateUserDto): Observable<IUser>;

  removeUser(request: IFindOneUserDto): Observable<IUser>;

  findOneUserForAuth(request: IFindOneUserByIdDto): Observable<IUser>;

  login(request: ILoginDto): Observable<IUser>;
}

export interface UsersServiceController {
  createUser(
    request: ICreateUserDto,
  ): Promise<IUser> | Observable<IUser> | IUser;

  findAllUsers(
    request: IPaginationDto,
  ): Promise<Users> | Observable<Users> | Users;

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

export const USERS_SERVICE_NAME = 'UserService';
