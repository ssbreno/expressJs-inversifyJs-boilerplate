import { BaseLogger } from '../loggers/base.logger';
import { injectable } from 'inversify';

@injectable()
export class AppLogger extends BaseLogger {
  public type = 'App';
}
