import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
export const isRpcError = (error: any) => {
  return JSON.parse(JSON.stringify(error?.metadata ?? {}))[
    'content-type'
  ]?.includes('application/grpc+proto');
};
@Injectable()
export class RcpErrorInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) =>
        throwError(() => {
          return isRpcError(error) ? new RpcException(error) : error;
        }),
      ),
    );
  }
}
