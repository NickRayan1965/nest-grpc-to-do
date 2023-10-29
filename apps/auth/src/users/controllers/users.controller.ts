import { Controller } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import {
  ICreateUserDto,
  IFindOneUserByIdDto,
  IFindOneUserDto,
  ILoginDto,
  IPaginationDto,
  IUpdateUserDto,
  UsersServiceController,
  UsersServiceControllerMethods,
} from '@app/common';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(private readonly usersService: UsersService) {}

  findOneUserForAuth(findOneUserByIdDto: IFindOneUserByIdDto) {
    return this.usersService.findOneUserForAuth(findOneUserByIdDto.id);
  }
  login(loginDto: ILoginDto) {
    return this.usersService.login(loginDto);
  }

  createUser(createUserDto: ICreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  findAllUsers(paginationDto: IPaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  findOneUser(findOneUserDto: IFindOneUserDto) {
    return this.usersService.findOne(findOneUserDto);
  }

  updateUser(updateUserDto: IUpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  removeUser(findOneUserDto: IFindOneUserDto) {
    return this.usersService.remove(findOneUserDto.id);
  }
}
