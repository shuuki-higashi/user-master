import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { User } from './User';

interface RoleInterface {
  role: string;
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  @IsNotEmpty()
  role: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany(type => User, user => user.roles)
  users?: Array<User> | undefined;

  @Column()
  @CreateDateColumn()
  readonly createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(obj?: RoleInterface) {
    this.role = (obj && obj.role) || 'NORMAL';
  }
}
