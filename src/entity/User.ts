import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Length } from 'class-validator';
import * as bcrypt from 'bcryptjs';

interface UserInterface {
  userName: string;
  password: string;
  email: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ name: 'user_name', type: 'varchar' })
  @Length(4, 20)
  userName: string;

  @Column({ name: 'password' })
  @Length(4, 100)
  password!: string;

  @Column({ name: 'email', type: 'varchar' })
  @Length(4, 40)
  email: string;

  @Column({ name: 'created_at' })
  @CreateDateColumn()
  readonly createdAt!: Date;

  @Column({ name: 'updated_at' })
  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(obj?: UserInterface) {
    this.userName = (obj && obj.userName) || '';
    this.password = (obj && obj.password) || '';
    this.email = (obj && obj.email) || '';
  }

  /// no commit with update
  update(obj?: UserInterface): User {
    this.userName = (obj && obj.userName) || this.userName;
    this.password = (obj && obj.password) || this.password;
    this.email = (obj && obj.email) || this.email;

    return this;
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
