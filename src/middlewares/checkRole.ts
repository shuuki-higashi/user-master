import { Request, Response, NextFunction, RequestHandler } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../entity/User';
import { Role } from '../entity/Role';

export const checkRole = (
  roles: Array<Role> | Array<string>
): RequestHandler => {
  // check Role | Array
  const roleTypes: Array<string> = [];
  roles.forEach((item: Role | string) => {
    if (typeof item === 'string') {
      roleTypes.push(item);
    } else {
      roleTypes.push(item.role);
    }
  });
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    //Get the user ID from previous middleware
    const id = res.locals.jwtPayload.userId;

    //Get user role from the database
    const userRepository = getRepository(User);
    let user!: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if array of authorized roles includes the user's role
    if (user.roles === null || typeof user.roles === 'undefined') {
      res.status(401).send();
    } else {
      user.roles.forEach((item: Role) => {
        if (roleTypes.indexOf(item.role) > -1) next();
        else res.status(401).send();
      });
    }
  };
};
