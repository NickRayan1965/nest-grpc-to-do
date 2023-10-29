import { Injectable } from '@nestjs/common';
import { Role } from '../entities/role.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRoles } from '@app/common';

@Injectable()
export class RoleService {
  private readonly entityName = Role.name;
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
    return role;
  }
}
