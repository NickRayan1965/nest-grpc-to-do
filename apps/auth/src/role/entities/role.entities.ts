import { IRole } from '@app/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEnum } from './enum/role.enum';

@Entity()
export class Role implements IRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('enum', { unique: true, enum: RoleEnum })
  name: RoleEnum;

  @Column('varchar', { length: 100 })
  description: string;
}
