import { BaseLogger } from './base.logger';
import { Response, Request } from 'express';
import { injectable } from 'inversify';
import { STATUS_CODES } from 'statuses';

@injectable()
export class ResponseLogger extends BaseLogger {
  public type = 'Response';

  public log(request: Request, response: Response, body?: any): void {
    if (!request.originalUrl.includes('swagger')) {
      this.debug(
        `${response.statusCode} ${STATUS_CODES[response.statusCode]} ${body}`,
      );
    }
  }
}
