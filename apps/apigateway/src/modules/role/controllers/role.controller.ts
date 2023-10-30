import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiBadRequestResponseImplementation,
  ApiForbiddenResponseImplementation,
  ApiNotFoundImplementation,
  ApiOkResponseImplementation,
  ApiUnauthorizedResponseImplementation,
} from 'apps/apigateway/src/common/decorators/swagger-controller.decorator';
import { RoleDto } from '../dtos/response/role.dto';

@Controller('role')
@ApiTags('Role')
@ApiBearerAuth()
@ApiUnauthorizedResponseImplementation()
@ApiForbiddenResponseImplementation()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOkResponseImplementation({ type: [RoleDto], method: 'get' })
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @ApiNotFoundImplementation()
  @ApiOkResponseImplementation({ type: RoleDto, method: 'get' })
  @ApiBadRequestResponseImplementation()
  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.roleService.findOne(id);
  }
}
