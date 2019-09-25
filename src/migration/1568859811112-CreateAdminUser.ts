import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { User } from '../entity/User';
import toHash from '../utils/to_hash';
import { Role } from '../entity/Role';

export class CreateAdminUser1568859811112 implements MigrationInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
  public async up(queryRunner: QueryRunner): Promise<any> {
    const admin = new Role({ role: 'ADMIN' });
    const roleRepository = getRepository(Role);
    const normal = new Role({ role: 'NORMAL' });
    await roleRepository.save(admin);
    await roleRepository.save(normal);
    const user = new User({
      firstName: 'kkiyama117',
      lastName: 'kkiyama',
      password: toHash('pass'),
      roles: [admin],
    });
    const userRepository = getRepository(User);
    await userRepository.save(user);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
  public async down(queryRunner: QueryRunner): Promise<any> {
    const userRepository = getRepository(User);
    await userRepository.clear();
    const roleRepository = getRepository(Role);
    await roleRepository.clear();
  }
}
