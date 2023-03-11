import { InstallmentsService } from '../../../application/business/installments/installments.service';
import { BaseController } from '../../../common/controllers/base.controller';
import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';

@injectable()
export class InstallmentsController extends BaseController {
  @inject(InstallmentsService)
  private readonly installmentsService: InstallmentsService;

  constructor() {
    super('/installments');
  }

  public initializeRoutes(): void {
    this.router.get(this.path, this.getProductInstallments.bind(this));
  }

  public async getProductInstallments(request: Request, response: Response) {
    try {
      const data = await this.installmentsService.getProductCategoryData(
        request.query,
      );
      return response.json(data);
    } catch (err) {
      throw err;
    }
  }
}
