import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const swaggerOption = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Express Example API',
      version: '0.4.12',
      description: 'APIの説明とかを記入。',
    },
  },
  apis: ['../routes/*.ts'],
};

export const swaggerJson = (
  /**
   * Express middleware
   *
   * @remarks
   * This method is part of the express.
   *
   * @param x - The first input number
   * @param y - The second input number
   * @returns The arithmetic mean of `x` and `y`
   *
   * @beta
   */
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerJSDoc(swaggerOption));
  next();
};

const headerFunc: RequestHandler = (req, res, next): void => {
  res.setHeader('content-type', 'text/html; charset=utf-8');
  next();
};

export const openAPIJSONMiddleware = (uri: string): Router => {
  const r = Router();
  r.get(`/${uri}.json`, swaggerJson);
  return r;
};

export default [
  headerFunc,
  swaggerUI.setup(swaggerJSDoc(swaggerOption)),
].concat();
