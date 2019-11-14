import { NextFunction, Response, Request, Router } from 'express';
import users from './users';

const routes = Router();

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: 'test',
  });
  next();
});

// all other routes
routes.use('/users', users);
export default routes;
