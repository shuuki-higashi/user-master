import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Length } from 'class-validator';
import { User } from './User';

interface NoteInterface {
  title: string;
  text: string;
  user: User | undefined;
}

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ name: 'title', type: 'varchar' })
  @Length(4, 20)
  title: string;

  @Column({ name: 'text', select: false })
  @Length(4, 100)
  text: string;

  @Column({ name: 'created_at' })
  @CreateDateColumn()
  readonly createdAt!: Date;

  @Column({ name: 'updated_at' })
  @UpdateDateColumn()
  updatedAt!: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany(type => User, user => user.notes)
  @JoinTable()
  user?: User | null;

  constructor(obj?: NoteInterface) {
    this.title = (obj && obj.title) || '';
    this.text = (obj && obj.text) || '';
    this.user = (obj && obj.user) || null;
  }
}
