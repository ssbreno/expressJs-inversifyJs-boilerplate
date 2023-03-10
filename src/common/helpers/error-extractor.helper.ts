import { ErrorResult } from '../interface/error-result.interface';
import { HttpError } from './../errors/http.error';
import { STATUS_CODES } from 'statuses';
import { ValidationError } from '../errors/validation.error';
import { injectable } from 'inversify';

@injectable()
export class ErrorExtractor {
  public extract(error: any): ErrorResult {
    const status500InternalServerError = 500;

    let status = status500InternalServerError;
    if (error instanceof HttpError) {
      status = error.status;
    }

    const message = STATUS_CODES[status];

    let errors = null;
    let place = null;
    if (error instanceof ValidationError) {
      errors = error.errors;
      place = error.place;
    }

    const result: ErrorResult = {
      status,
      message,
    };

    if (process.env.debug && status === status500InternalServerError) {
      result.stack = error.stack;
      errors = [error.message];
    }

    if (errors !== null) {
      result.errors = errors;
    }
    if (place !== null) {
      result.place = place;
    }

    return result;
  }
}
