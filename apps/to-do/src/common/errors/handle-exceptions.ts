import {
  RpcConflictException,
  RpcInternalServerErrorException,
} from 'apps/auth/src/common/errors/rcp-exception.exception';
//errores devueltos por la DB
export const handleExceptions = (error: any, nameEntity: string): never => {
  if (error.code === 11000)
    throw new RpcConflictException(
      `The ${nameEntity} already exists in the database. Details: ${JSON.stringify(
        error.detail,
      )}`,
    );
  throw new RpcInternalServerErrorException(
    'Error while trying to save the entity',
  );
};
