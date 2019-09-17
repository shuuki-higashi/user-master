import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';

import indexRouter from './src/routes';
import usersRouter from './src/routes/users';
import * as path from 'path';

const app = express();

app.use(logger('dev'));
app.use(express.json({ type: 'application/hal+json' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;
