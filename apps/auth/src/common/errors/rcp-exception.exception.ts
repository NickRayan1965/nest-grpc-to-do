import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class RpcBadRequestException extends RpcException {
  constructor(message: string) {
    super(JSON.stringify(new BadRequestException(message).getResponse()));
  }
}
export class RpcNotFoundException extends RpcException {
  constructor(message: string) {
    super(JSON.stringify(new NotFoundException(message).getResponse()));
  }
}
export class RpcConflictException extends RpcException {
  constructor(message: string) {
    super(JSON.stringify(new ConflictException(message).getResponse()));
  }
}
export class RpcInternalServerErrorException extends RpcException {
  constructor(message: string) {
    super(
      JSON.stringify(new InternalServerErrorException(message).getResponse()),
    );
  }
}

export class RcpUnauthorizedException extends RpcException {
  constructor(message: string) {
    super(JSON.stringify(new UnauthorizedException(message).getResponse()));
  }
}
export class RcpForbiddenException extends RpcException {
  constructor(message: string) {
    super(JSON.stringify(new ForbiddenException(message).getResponse()));
  }
}
