import { InstallmentsController } from './installments.controller';
import { InstallmentsService } from '../../../application/business/installments/installments.service';
import { Request, Response } from 'express';

describe('InstallmentsController', () => {
  let installmentsController: InstallmentsController;
  let installmentsService: InstallmentsService;
  let request: Request;
  let response: Response;

  beforeEach(() => {
    installmentsService = {
      getProductCategoryData: jest.fn(),
    } as unknown as InstallmentsService;
    installmentsController = new InstallmentsController();
    request = {} as Request;
    response = {
      json: jest.fn(),
    } as unknown as Response;
  });

  it('should be defined', () => {
    expect(installmentsController).toBeDefined();
  });

  it('should be defined', () => {
    expect(installmentsService).toBeDefined();
  });
});
