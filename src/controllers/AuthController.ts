import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { User } from '../entity/User';
import config from '../config/config';
import toHash from '../utils/to_hash';

class AuthController {
  static login = async (req: Request, res: Response): Promise<void> => {
    //Check if username and password are set
    const { firstName, lastName, password } = req.body;
    if (!(firstName && lastName && password)) {
      res.status(400).send();
    }

    //Get user from database
    const userRepository = getRepository(User);
    let user!: User;
    try {
      user = await userRepository.findOneOrFail({
        where: { firstName: firstName, lastName: lastName },
      });
    } catch (error) {
      res.status(401).send();
    }

    //Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, username: `${user.firstName} ${user.lastName}` },
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    //Send the jwt in the response
    res.send(token);
  };

  static changePassword = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    //Get user from the database
    const userRepository = getRepository(User);
    let user!: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    //Validate de model (password lenght)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Hash the new password and save
    user.password = toHash(user.password);
    await userRepository.save(user);

    res.status(204).send();
  };
}

export default AuthController;
