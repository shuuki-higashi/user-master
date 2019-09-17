import { NextFunction, Response, Request, Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: 'test',
  });
  next();
});

export default router;
