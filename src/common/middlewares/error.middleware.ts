import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ErrorExtractor } from '../helpers/error-extractor.helper';

@injectable()
export class ErrorMiddleware {
  @inject(ErrorExtractor) private readonly errorHelper: ErrorExtractor;

  public handle(
    error: any,
    request: Request,
    response: Response,
    next: NextFunction,
  ): void {
    const result = this.errorHelper.extract(error);

    response.status(result.status).send({
      ...result,
    });
  }
}
