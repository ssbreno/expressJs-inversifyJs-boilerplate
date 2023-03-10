import { HttpError } from './../errors/http.error';

export abstract class StatusHelper {
  public static status200OK = 200;
  public static status201Created = 201;
  public static status202Accepted = 202;
  public static status204NoContent = 204;

  public static error400BadRequest: HttpError = new HttpError(400);
  public static error401Unauthorized: HttpError = new HttpError(401);
  public static error403Forbidden: HttpError = new HttpError(403);
  public static error404NotFound: HttpError = new HttpError(404);
}
