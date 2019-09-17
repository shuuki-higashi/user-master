import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { NextFunction, Request, Response } from 'express';

import indexRouter from './src/routes';
import usersRouter from './src/routes/users';
import * as path from 'path';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json({ type: 'application/hal+json' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const halMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.setHeader('content-type', 'application/hal+json; charset=utf-8');
  next();
};

// Add HAL header
app.use(halMiddleware);

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;
