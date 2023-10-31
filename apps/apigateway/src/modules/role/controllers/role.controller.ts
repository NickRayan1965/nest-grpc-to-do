import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ApiBadRequestResponseImplementation,
  ApiForbiddenResponseImplementation,
  ApiNotFoundImplementation,
  ApiOkResponseImplementation,
  ApiUnauthorizedResponseImplementation,
} from 'apps/apigateway/src/common/decorators/swagger-controller.decorator';
import { RoleDto } from '../dtos/response/role.dto';
import { getArrayStringFromRoles } from 'apps/apigateway/src/common/utils/get-array-string-from-roles.util';
import { RoleEnum } from 'apps/auth/src/role/entities/enum/role.enum';
import { Auth } from 'apps/apigateway/src/auth/decorators/auth.decorator';

@Controller('role')
@ApiTags('Role')
@ApiBearerAuth()
@ApiUnauthorizedResponseImplementation()
@ApiForbiddenResponseImplementation()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOkResponseImplementation({ type: [RoleDto], method: 'get' })
  @ApiOperation({
    summary: 'Get all roles',
    description: `Required roles: ${getArrayStringFromRoles([
      RoleEnum.SUPER_ADMIN,
    ])}`,
  })
  @Auth(RoleEnum.SUPER_ADMIN)
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @ApiNotFoundImplementation()
  @ApiOkResponseImplementation({ type: RoleDto, method: 'get' })
  @ApiBadRequestResponseImplementation()
  @ApiOperation({
    summary: 'Get role by id',
    description: `Required roles: ${getArrayStringFromRoles([
      RoleEnum.SUPER_ADMIN,
    ])}`,
  })
  @Auth(RoleEnum.SUPER_ADMIN)
  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.roleService.findOne(id);
  }
}
