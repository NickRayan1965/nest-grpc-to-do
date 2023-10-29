//import { IPaginationResponse } from '@app/common';
import { IPaginationResponse } from '@app/common';
import { HttpStatus } from '@nestjs/common';

export interface IBuildResponseOptions {
  status: HttpStatus;
  data: any;
  pagination?: IPaginationResponse;
}
export function buildResponse<T>({
  data,
  status,
  pagination,
}: IBuildResponseOptions) {
  const meta = {
    [HttpStatus.OK]: {
      statusCode: HttpStatus.OK,
      message: 'OK',
    },
    [HttpStatus.CREATED]: {
      statusCode: HttpStatus.CREATED,
      message: 'Created',
    },
  };
  return {
    data,
    meta: meta[status],
    pagination,
  } as T;
}
