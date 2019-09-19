import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { User } from '../entity/User';
import toHash from '../utils/to_hash';

export class CreateAdminUser1568859811112 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const user = new User({
      firstName: 'kkiyama117',
      lastName: 'kkiyama',
      password: toHash('pass'),
      role: 'ADMIN',
    });
    const userRepository = getRepository(User);
    await userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
