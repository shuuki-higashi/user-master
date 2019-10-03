import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express';
import yaml from 'yamljs';

const swaggerYAML = yaml.load('./src/routes/OPENAPI.yaml');

export const swaggerJson = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerYAML);
  next();
};

export const openAPIJSONMiddleware = (): Router => {
  const r = Router();
  r.get('/', swaggerJson);
  return r;
};

export default swaggerYAML;
