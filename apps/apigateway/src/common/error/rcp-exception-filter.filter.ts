import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const error: any = JSON.parse((exception.getError() as any).details);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(error.statusCode).json(error);
  }
}
