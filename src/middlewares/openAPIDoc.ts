import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const option = {
  explorer: true,
};
const swaggerDocument = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express Example API',
      version: '0.4.12',
      description: 'APIの説明とかを記入。',
    },
    termsOfService: 'https://github.com/kkiyama117/express_docker/',
    contact: { email: 'k.kiyama117@gmail.com' },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
    },
    host: 'localhost:8000',
    basePath: '/',
    servers: [
      {
        url: 'localhost:8000/',
      },
      {
        url: 'localhost:8001/',
      },
    ],
    externalDocs: {
      description: 'Find more info here',
      url: '/docs/typedoc',
    },
  },
  apis: ['**/routes/*.ts', '**/OPENAPI.yaml'],
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
  res.send(swaggerJSDoc(swaggerDocument));
  next();
};

const headerFunc: RequestHandler = (req, res, next): void => {
  res.setHeader('content-type', 'text/html; charset=utf-8');
  next();
};

export const openAPIJSONMiddleware = (): Router => {
  const r = Router();
  r.get('/', swaggerJson);
  return r;
};

export default [
  headerFunc,
  swaggerUI.setup(swaggerJSDoc(swaggerDocument), option),
];
