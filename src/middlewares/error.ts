import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

const errorMiddleware: ErrorRequestHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.setHeader('content-type', 'application/hal+json; charset=utf-8');
  res.status(err.status || 500);
  next();
};
export default errorMiddleware;
