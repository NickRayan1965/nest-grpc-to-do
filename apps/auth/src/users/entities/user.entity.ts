import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '@app/common';
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
}
