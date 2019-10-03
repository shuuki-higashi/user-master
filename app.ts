import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import routes from './src/routes';
import * as path from 'path';
import halMiddleware from './src/middlewares/addHALHeaders';
import errorMiddleware from './src/middlewares/error';
import { createConnection } from 'typeorm';
import apiDoc, { openAPIJSONMiddleware } from './src/middlewares/openAPIDoc';
import swaggerUiExpress = require('swagger-ui-express');

const app = express();
createConnection().then(async () => {
  // log request
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cors());
  app.use(helmet());
  app.use(express.static(path.join(__dirname, 'public')));
  // Add HAL header
  app.use(halMiddleware());
  app.use(errorMiddleware());
  if (process.env.NODE_ENV != 'production') {
    app.use(swaggerUiExpress.serve);
    app.use('/docs', apiDoc);
    app.use(openAPIJSONMiddleware('docs'));
  }
  app.get('/', routes);
});

export default app;
