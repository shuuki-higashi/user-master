import { NextFunction, Request, Response } from 'express';

import express from 'express';
import { GetUser } from '../index';
import { User } from '../entity/User';

const router = express.Router();

/* GET users listing. */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const user = await GetUser(1);
  if (user == null) {
    res.send('');
  } else {
    res.json({
      _links: {
        self: { href: '/users' },
        'ea:find': {
          href: `/users/${user.id}`,
        },
      },
      user: user,
    });
  }
  next();
});

export default router;
