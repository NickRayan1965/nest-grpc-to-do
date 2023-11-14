import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  InternalServerErrorException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import isValidJson from '../utils/is-valid-json.util';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const expectedErrorString = exception.getError()?.details;
    const internalServerError = new InternalServerErrorException();
    const finalErrorString = isValidJson(expectedErrorString)
      ? expectedErrorString
      : JSON.stringify(internalServerError.getResponse());
    const errorJson: any = JSON.parse(finalErrorString);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(errorJson.statusCode).json(errorJson);
  }
}
