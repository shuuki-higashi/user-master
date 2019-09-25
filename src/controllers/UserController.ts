import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { User } from '../entity/User';
import toHash from '../utils/to_hash';

class UserController {
  static listAll = async (req: Request, res: Response): Promise<void> => {
    //Get users from database
    const userRepository = getRepository(User);
    const users = await userRepository.find({
      select: ['id', 'firstName', 'lastName', 'roles'], //We dont want to send the passwords on response
    });

    //Send the users object
    res.send(users);
  };

  static getOneById = async (req: Request, res: Response): Promise<void> => {
    //Get the ID from the url
    const id = req.params.id;

    //Get the user from database
    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOneOrFail(id, {
        select: ['id', 'firstName', 'lastName', 'roles'], //We dont want to send the password on response
      });
    } catch (error) {
      res.status(404).send('User not found');
    }
  };

  static newUser = async (req: Request, res: Response): Promise<void> => {
    //Get parameters from the body
    const { firstName, lastName, password, roles } = req.body;
    const user = new User({ firstName, lastName, roles, password });

    //Validate if the parameters are ok
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Hash the password, to securely store on DB
    user.password = toHash(user.password);

    //Try to save. If fails, the name is already in use
    const userRepository = getRepository(User);
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send('name already in use');
      return;
    }

    //If all ok, send 201 response
    res.status(201).send('User created');
  };

  static editUser = async (req: Request, res: Response): Promise<void> => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { firstName, lastName, roles } = req.body;

    //Try to find user on database
    const userRepository = getRepository(User);
    let user;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send('User not found');
      return;
    }

    //Validate the new values on model
    user.firstName = firstName;
    user.lastName = lastName;
    user.roles = roles;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means name already in use
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send('name already in use');
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

  static deleteUser = async (req: Request, res: Response): Promise<void> => {
    //Get the ID from the url
    const id = req.params.id;

    const userRepository = getRepository(User);
    let user!: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('User not found');
      return;
    }
    await userRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };
}

export default UserController;
