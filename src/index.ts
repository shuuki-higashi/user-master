import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import { User } from './entity/User';

class MyDBError extends Error {}
function _conn(): Promise<Connection> {
  return createConnection();
}
function PostUser(firstName: string, lastName: string): User | void {
  _conn()
    .then(async connection => {
      // Save
      console.log('Inserting a new user into the database...');
      const user: User = new User(firstName, lastName);
      await connection.manager.save(user);
      console.log('Saved a new user with id: ' + user.id);

      // Load after all
      console.log('Loading users from the database...');
      const users = await connection.manager.find(User);
      console.log('Loaded users: ', users);
      return users;
    })
    .catch(error => {
      console.log(error);
      throw new MyDBError('ERROR');
    });
}
function GetUser(id: number): Promise<User> | void {
  _conn()
    .then(async connection => {
      console.log('Loading users from the database...');
      const user = await connection.manager.findOne(User, id);
      console.log('Loaded users: ', user);
      return user;
    })
    .catch(error => {
      console.log(error);
      throw new MyDBError('ERROR');
    });
}

export { PostUser, GetUser };
