import { IRole } from '@app/common';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEnum } from './enum/role.enum';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Role implements IRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('enum', { unique: true, enum: RoleEnum })
  name: RoleEnum;

  @Column('varchar', { length: 100 })
  description: string;

  @ManyToMany(() => Role, (role) => role.users)
  users: User[];
}
