import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, Length } from 'class-validator';
import * as bcrypt from 'bcryptjs';

interface UserInterface {
  firstName: string;
  lastName: string;
  role: string;
  password: string;
}

@Entity('users')
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
  @IsNotEmpty()
  role: string;

  @Column()
  @CreateDateColumn()
  readonly createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(obj?: UserInterface) {
    this.firstName = (obj && obj.firstName) || '';
    this.lastName = (obj && obj.lastName) || '';
    this.role = (obj && obj.role) || 'NORMAL';
    this.password = (obj && obj.password) || '';
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
