import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import {
  CreateUserAsAdminDto,
  CreateUserDto,
} from '../dtos/create/create-user.dto';
import { GetUsersQueryDto } from '../dtos/query/get-users-query.dto';
import { UpdateUserDto } from '../dtos/update/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'apps/apigateway/src/auth/decorators/auth.decorator';
import {
  ApiBadRequestResponseImplementation,
  ApiConflictResponseImplementation,
  ApiForbiddenResponseImplementation,
  ApiOkResponseImplementation,
  ApiUnauthorizedResponseImplementation,
} from 'apps/apigateway/src/common/decorators/swagger-controller.decorator';
import { UsersDto } from '../dtos/response/users.dto';
import { UserDto } from '../dtos/response/user.dto';
import { GetUser } from 'apps/apigateway/src/auth/decorators/get-user.decorator';
import { RoleEnum } from 'apps/auth/src/role/entities/enum/role.enum';
import { getArrayStringFromRoles } from 'apps/apigateway/src/common/utils/get-array-string-from-roles.util';
@Controller('user')
@ApiTags('User')
@ApiBadRequestResponseImplementation()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiConflictResponseImplementation()
  @ApiOperation({ summary: 'Register new user' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiConflictResponseImplementation()
  @ApiUnauthorizedResponseImplementation()
  @ApiForbiddenResponseImplementation()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Register new user as admin',
    description: `Required roles: ${getArrayStringFromRoles([
      RoleEnum.SUPER_ADMIN,
    ])}`,
  })
  @Auth(RoleEnum.SUPER_ADMIN)
  @Post('as-admin')
  createAsAdmin(@Body() createUserAsAdminDto: CreateUserAsAdminDto) {
    return this.userService.createAsAdmin(createUserAsAdminDto);
  }

  @ApiOkResponseImplementation({ type: UsersDto, method: 'get' })
  @ApiUnauthorizedResponseImplementation()
  @ApiForbiddenResponseImplementation()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all users',
    description: `Required roles: ${getArrayStringFromRoles([
      RoleEnum.SUPER_ADMIN,
    ])}`,
  })
  @Auth(RoleEnum.SUPER_ADMIN)
  @Get()
  findAll(@Query() queryParams: GetUsersQueryDto) {
    return this.userService.findAll(queryParams);
  }

  @ApiOkResponseImplementation({ type: UserDto, method: 'get' })
  @ApiUnauthorizedResponseImplementation()
  @ApiOperation({
    summary: 'Get my profile',
  })
  @Auth()
  @Get('my-profile')
  getMyProfile(@GetUser('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOkResponseImplementation({ type: UserDto, method: 'get' })
  @ApiUnauthorizedResponseImplementation()
  @ApiForbiddenResponseImplementation()
  @ApiBearerAuth()
  @Auth(RoleEnum.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Get user by id',
    description: `Required roles: ${getArrayStringFromRoles([
      RoleEnum.SUPER_ADMIN,
    ])}`,
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @ApiOkResponseImplementation({ type: UserDto, method: 'update' })
  @ApiOperation({
    summary: 'Update my profile',
  })
  @Auth()
  @Patch()
  update(@GetUser('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOkResponseImplementation({ type: UserDto, method: 'delete' })
  @ApiUnauthorizedResponseImplementation()
  @ApiForbiddenResponseImplementation()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete user by id',
    description: `Required roles: ${getArrayStringFromRoles([
      RoleEnum.SUPER_ADMIN,
    ])}`,
  })
  @Auth(RoleEnum.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
