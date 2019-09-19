import { NextFunction, Response, Request, Router } from 'express';
import users from './users';
import auth from './auth';

const routes = Router();

/* GET home page. */
routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: 'test',
  });
  next();
});

// all other routes
routes.use('/users', users);
routes.use('/auth', auth);
export default routes;
