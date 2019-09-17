import { NextFunction, Request, Response } from 'express';

const halMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.setHeader('content-type', 'application/hal+json; charset=utf-8');
  next();
};
export default halMiddleware;
