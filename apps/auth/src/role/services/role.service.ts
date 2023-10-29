import { Injectable } from '@nestjs/common';
import { Role } from '../entities/role.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRoles } from '@app/common';
import { RpcNotFoundException } from '../../common/errors/rcp-exception.exception';

@Injectable()
export class RoleService {
  //private readonly entityName = Role.name;
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  async findAll(): Promise<IRoles> {
    const roles = await this.roleRepository.find();
    return { roles };
  }
  async findOneById(id: string) {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new RpcNotFoundException('Role with id ' + id + ' not found');
    }
    return role;
  }
}
