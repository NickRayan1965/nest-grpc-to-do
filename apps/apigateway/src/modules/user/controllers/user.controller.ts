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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
@Controller('user')
@ApiTags('User')
@ApiBadRequestResponseImplementation()
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiConflictResponseImplementation()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiConflictResponseImplementation()
  @ApiUnauthorizedResponseImplementation()
  @ApiForbiddenResponseImplementation()
  @Auth(RoleEnum.SUPER_ADMIN)
  createAsAdmin(@Body() createUserAsAdminDto: CreateUserAsAdminDto) {
    return this.userService.createAsAdmin(createUserAsAdminDto);
  }

  @ApiOkResponseImplementation({ type: UsersDto, method: 'get' })
  @ApiUnauthorizedResponseImplementation()
  @ApiForbiddenResponseImplementation()
  @Auth(RoleEnum.SUPER_ADMIN)
  @Get()
  findAll(@Query() queryParams: GetUsersQueryDto) {
    return this.userService.findAll(queryParams);
  }

  @ApiOkResponseImplementation({ type: UserDto, method: 'get' })
  @ApiUnauthorizedResponseImplementation()
  @Auth()
  @Get('my-profile')
  getMyProfile(@GetUser('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOkResponseImplementation({ type: UserDto, method: 'get' })
  @ApiUnauthorizedResponseImplementation()
  @ApiForbiddenResponseImplementation()
  @Auth(RoleEnum.SUPER_ADMIN)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @ApiOkResponseImplementation({ type: UserDto, method: 'update' })
  @Auth()
  @Patch()
  update(@GetUser('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOkResponseImplementation({ type: UserDto, method: 'delete' })
  @ApiUnauthorizedResponseImplementation()
  @ApiForbiddenResponseImplementation()
  @Auth(RoleEnum.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
