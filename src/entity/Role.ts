import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

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
