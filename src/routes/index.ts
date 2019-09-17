import { Response, Request, Router } from 'express';
// import { NextFunction, Response, Request, Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', (req: Request, res: Response) => {
  // router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: 'test',
  });
});

export default router;
