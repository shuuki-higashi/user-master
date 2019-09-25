import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Length } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { Role } from './Role';

interface UserInterface {
  firstName: string;
  lastName: string;
  roles: Array<Role>;
  password: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ name: 'first_name', type: 'varchar' })
  @Length(4, 20)
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar' })
  @Length(4, 20)
  lastName: string;

  @Column()
  @Length(4, 100)
  password!: string;

  @Column()
  @CreateDateColumn()
  readonly createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt!: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany(type => Role)
  @JoinTable()
  roles?: Array<Role> | null;

  constructor(obj?: UserInterface) {
    this.firstName = (obj && obj.firstName) || '';
    this.lastName = (obj && obj.lastName) || '';
    this.password = (obj && obj.password) || '';
    this.roles = (obj && obj.roles) || null;
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
