import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export function Auth() {
  //extensible decorator
  return applyDecorators(UseGuards(AuthGuard()));
}
