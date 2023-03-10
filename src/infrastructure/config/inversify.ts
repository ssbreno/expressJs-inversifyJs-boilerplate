import { App } from '../../app';
import { ErrorExtractor } from '../../common/helpers/error-extractor.helper';
import { AppLogger } from '../../common/loggers/app.logger';
import { RequestLogger } from '../../common/loggers/request.logger';
import { ResponseLogger } from '../../common/loggers/response.logger';
import { ErrorMiddleware } from '../../common/middlewares/error.middleware';
import { RequestLoggerMiddleware } from '../../common/middlewares/request-logger.middleware';
import { ResponseLoggerMiddleware } from '../../common/middlewares/response-logger.middleware';
import {
  Container as InversifyContainer,
  interfaces,
  ContainerModule,
} from 'inversify';
import { BaseController } from '../../common/controllers/base.controller';
import { CategoryController } from '../../application/controllers/category/category.controller';
import { CategoryService } from '../../application/business/category/category.service';
import { SwaggerConfig } from '../../infrastructure/config/swagger';

export class Container {
  private _container: InversifyContainer = new InversifyContainer();

  protected get container(): InversifyContainer {
    return this._container;
  }

  constructor() {
    this.register();
  }

  public getApp(): App {
    return this.container.get(App);
  }

  private register(): void {
    this._container.load(this.getLoggersModule());
    this._container.load(this.getMiddlewaresModule());
    this._container.load(this.getGeneralModule());
    this._container.load(this.getControllersModule());
    this._container.load(this.getHelpersModule());
    this._container.load(this.getServicesModule());

    this._container.bind<App>(App).toSelf();
  }

  private getControllersModule(): ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind<BaseController>(BaseController).to(CategoryController);
    });
  }

  private getServicesModule(): ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind<CategoryService>(CategoryService).toSelf();
    });
  }

  private getLoggersModule(): ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind<AppLogger>(AppLogger).toSelf();
      bind<RequestLogger>(RequestLogger).toSelf();
      bind<ResponseLogger>(ResponseLogger).toSelf();
    });
  }

  private getMiddlewaresModule(): ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind<RequestLoggerMiddleware>(RequestLoggerMiddleware).toSelf();
      bind<ErrorMiddleware>(ErrorMiddleware).toSelf();
      bind<ResponseLoggerMiddleware>(ResponseLoggerMiddleware).toSelf();
    });
  }

  private getGeneralModule(): ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind<SwaggerConfig>(SwaggerConfig).toSelf();
    });
  }

  private getHelpersModule(): ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind<ErrorExtractor>(ErrorExtractor).toSelf();
    });
  }
}
