import * as express from 'express';
import * as cors from 'cors';
import dataSource from './infrastructure/config/datasource';
import { ErrorMiddleware } from './common/middlewares/error.middleware';
import { inject, injectable, multiInject } from 'inversify';
import { ResponseLoggerMiddleware } from './common/middlewares/response-logger.middleware';
import { RequestLoggerMiddleware } from './common/middlewares/request-logger.middleware';
import bodyParser = require('body-parser');
import { AppLogger } from './common/loggers/app.logger';
import { BaseController } from './common/controllers/base.controller';
import { SwaggerConfig } from './infrastructure/config/swagger';

@injectable()
export class App {
  private app: express.Application = express();

  @inject(ErrorMiddleware) private readonly errorMiddleware: ErrorMiddleware;
  @inject(RequestLoggerMiddleware)
  private readonly requestLoggerMiddleware: RequestLoggerMiddleware;
  @inject(ResponseLoggerMiddleware)
  private readonly responseLoggerMiddleware: ResponseLoggerMiddleware;
  @inject(AppLogger) private readonly appLogger: AppLogger;
  @inject(SwaggerConfig) private readonly swaggerConfig: SwaggerConfig;
  @multiInject(BaseController) private controllers: BaseController[];

  public initialize(process: NodeJS.Process): void {
    dataSource.initialize();

    this.initializePreMiddlewares();
    this.initializeControllers();
    this.initializePostMiddlewares();
  }

  public listen() {
    const port = process.env.PORT || 8000;
    this.app.listen(port, () => {
      this.swaggerConfig.initialize(this.app);
      this.appLogger.info(
        `Server started with pid: ${process.pid} on port: ${port}`,
      );
    });
  }

  private initializePreMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(
      cors({
        origin: '*',
        credentials: true,
      }),
    );

    this.app.use(
      this.requestLoggerMiddleware.handle.bind(this.requestLoggerMiddleware),
    );
    this.app.use(
      this.responseLoggerMiddleware.handle.bind(this.responseLoggerMiddleware),
    );
  }

  private initializeControllers(): void {
    this.app.get('/', (req, res) => {
      res.redirect('/docs');
    });

    this.controllers.forEach((controller: BaseController) => {
      controller.initializeRoutes();

      this.app.use('/api', controller.router);
      this.appLogger.debug(`Registered '/api${controller.path}'.`);
    });
  }

  private initializePostMiddlewares(): void {
    this.app.use(this.errorMiddleware.handle.bind(this.errorMiddleware));
  }
}
