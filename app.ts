import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import indexRouter from './src/routes';
import usersRouter from './src/routes/users';
import * as path from 'path';
import halMiddleware from './src/middlewares/addHeaders';
import errorMiddleware from './src/middlewares/error';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json({ type: 'application/hal+json' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Add HAL header
app.use(halMiddleware);
app.use(errorMiddleware);

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;
