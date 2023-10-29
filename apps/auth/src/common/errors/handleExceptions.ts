import {
  RpcConflictException,
  RpcInternalServerErrorException,
} from './rcp-exception.exception';
//errores devueltos por la DB

export const handleExceptions = (error: any, nameEntity: string): never => {
  if (error.code === '23505') {
    throw new RpcConflictException(
      `The ${nameEntity} already exists in the database. Details: ${error.detail}`,
    );
  }
  throw new RpcInternalServerErrorException(
    'Error while trying to save the entity',
  );
};
