import { Injectable } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RpcNotFoundException } from '../../common/errors/rcp-exception.exception';
import { RoleEnum } from '../entities/enum/role.enum';

@Injectable()
export class RoleService {
  //private readonly entityName = Role.name;
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  async findAll() {
    return { roles: await this.roleRepository.find() };
  }
  async findOneById(id: string) {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new RpcNotFoundException('Role with id ' + id + ' not found');
    }
    return role;
  }
  async findOneByName(name: RoleEnum) {
    const role = await this.roleRepository.findOne({ where: { name } });
    if (!role) {
      throw new RpcNotFoundException('Role with name ' + name + ' not found');
    }
    return role;
  }
}
