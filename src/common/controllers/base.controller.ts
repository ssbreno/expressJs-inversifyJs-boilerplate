import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import { injectable } from 'inversify';
import PromiseRouter from 'express-promise-router';

@injectable()
export abstract class BaseController {
  public readonly path: string;
  public readonly router: Router;

  public abstract initializeRoutes(): void;

  constructor(path = '') {
    this.router = PromiseRouter();
    this.path = path;

    this.router
      .all(this.path, this.authenticate())
      .all(`${this.path}/*`, this.authenticate());
  }

  private authenticate(): RequestHandler {
    return (request: Request, response: Response, next: NextFunction) => {
      next();
    };
  }
}
