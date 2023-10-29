import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
import { RcpUnauthorizedException } from '../../common/errors/rcp-exception.exception';

@Injectable()
export class UsersService {
  private readonly entityName = User.name;
  private readonly relations: FindOptionsRelations<User> = {};
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {}
  async create(createUserDto: ICreateUserDto) {
    createUserDto.password = Encrypter.encrypt(createUserDto.password);
    try {
      const user = await this.userRepository.save(createUserDto);
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
    if (!user) throw new NotFoundException('User with id ' + id + ' not found');
    return user;
  }

  async update({ id, ...restOfDto }: IUpdateUserDto) {
    const user = await this.findOne({ id, relations: true });
    try {
      const updatedUser = await this.userRepository.save(
        this.userRepository.merge(user, restOfDto),
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
    });
    if (!user) throw new RcpUnauthorizedException('User not found');
    if (!user.isActive)
      throw new RcpUnauthorizedException('User is not active');
    return user;
  }
}
