import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '@app/common';
import { Role } from '../../role/entities/role.entities';
@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 25, unique: true })
  username: string;

  @Column('varchar', { length: 200 })
  password: string;

  @Column('boolean', { default: true })
  isActive: boolean;

  @ManyToMany(() => Role, (role) => role.users, {
    cascade: true,
  })
  roles: Role[];
}
