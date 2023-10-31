import { Inject, Injectable } from '@nestjs/common';
import {
  ICreateUserDto,
  IFindOneUserDto,
  ILoginDto,
  IPaginationDto,
  IUpdateUserDto,
} from '@app/common';
import { FindOptionsRelations, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { handleExceptions } from 'apps/auth/src/common/errors/handleExceptions';
import { Encrypter } from '@app/common/utilities';
import config from '../../config/config';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import {
  RcpUnauthorizedException,
  RpcNotFoundException,
} from '../../common/errors/rcp-exception.exception';
import { RoleService } from '../../role/services/role.service';

@Injectable()
export class UsersService {
  private readonly entityName = User.name;
  private readonly relations: FindOptionsRelations<User> = {
    roles: true,
  };
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
    private readonly roleService: RoleService,
  ) {}
  async create(createUserDto: ICreateUserDto) {
    const dtoValidated = await this.validateUserDto(createUserDto);
    dtoValidated.password = Encrypter.encrypt(dtoValidated.password);
    try {
      const user = await this.userRepository.save(dtoValidated);
      return user;
    } catch (error) {
      handleExceptions(error, this.entityName);
    }
  }

  async findAll(paginationDto: IPaginationDto) {
    const { query } = this.configService;
    const {
      page = query.page,
      page_size = query.page_size,
      relations = false,
    } = paginationDto;
    const users = await this.userRepository.find({
      take: page_size,
      skip: page_size * (page - query.min_page),
      relations: relations ? this.relations : undefined,
    });
    return { users };
  }

  findOne({ id, relations = true }: IFindOneUserDto) {
    const user = this.userRepository.findOne({
      where: { id },
      relations: relations ? this.relations : undefined,
    });
    if (!user)
      throw new RpcNotFoundException('User with id ' + id + ' not found');
    return user;
  }

  async update({ id, ...restOfDto }: IUpdateUserDto) {
    const user = await this.findOne({ id, relations: true });
    const dtoValidated = await this.validateUserDto(restOfDto);
    dtoValidated.password = dtoValidated.password
      ? Encrypter.encrypt(dtoValidated.password)
      : undefined;
    try {
      const updatedUser = await this.userRepository.save(
        this.userRepository.merge(user, dtoValidated),
      );
      return updatedUser;
    } catch (error) {
      handleExceptions(error, this.entityName);
    }
  }

  async remove(id: string) {
    await this.findOne({ id, relations: false });
    return await this.userRepository.save({ id, is_active: false });
  }
  async login(loginDto: ILoginDto) {
    const user = await this.userRepository.findOne({
      where: { username: loginDto.username },
      relations: this.relations,
    });
    if (
      !user ||
      !Encrypter.checkPassword(loginDto.password, user?.password ?? '')
    )
      throw new RcpUnauthorizedException('Credentials are not valid');
    return user;
  }
  async findOneUserForAuth(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: this.relations,
    });
    this.validateUser(user);
    return user;
  }

  private async validateUserDto(userDto: Partial<ICreateUserDto> = {}) {
    const { roleIds = [], ...restOfDto } = userDto;
    const rolesPromises = Promise.all(
      roleIds.map((roleId) => this.roleService.findOneById(roleId)),
    );
    const [roles] = await Promise.all([
      roleIds.length ? rolesPromises : undefined,
    ]);
    return this.userRepository.create({ ...restOfDto, roles });
  }
  private validateUser(user: User) {
    if (!user) throw new RcpUnauthorizedException('User not found');
    if (!user.isActive)
      throw new RcpUnauthorizedException('User is not active');
  }
}
