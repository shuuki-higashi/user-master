import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import routes from './src/routes';
import * as path from 'path';
import halMiddleware from './src/middlewares/addHeaders';
import errorMiddleware from './src/middlewares/error';
import { createConnection } from 'typeorm';

const app = express();
createConnection().then(async () => {
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cors());
  app.use(helmet());
  app.use(express.static(path.join(__dirname, 'public')));
  // Add HAL header
  app.use(halMiddleware);
  app.use(errorMiddleware);

  app.use('/', routes);
});

export default app;
