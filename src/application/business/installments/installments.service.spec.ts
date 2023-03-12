import { InstallmentsDTO } from '../../../domain/dto/installments.dto';
import { CategoryService } from '../category/category.service';
import { ProductService } from '../products/products.service';
import { InstallmentsService } from './installments.service';

describe('InstallmentsService', () => {
  let service: InstallmentsService;
  let categoryService: CategoryService;
  let productService: ProductService;

  beforeEach(() => {
    categoryService = new CategoryService();
    productService = new ProductService(categoryService);
    service = new InstallmentsService(productService);
  });

  describe('getTaxCategory', () => {
    it('should return 5% tax for "informática" category', () => {
      const tax = service.getTaxCategory('informática');
      expect(tax).toBe(0.05);
    });

    it('should return 2.5% tax for "automotivo" category', () => {
      const tax = service.getTaxCategory('automotivo');
      expect(tax).toBe(0.025);
    });

    it('should return 1% tax for "móveis" category', () => {
      const tax = service.getTaxCategory('móveis');
      expect(tax).toBe(0.01);
    });

    it('should return 0 tax for unknown category', () => {
      const tax = service.getTaxCategory('unknown');
      expect(tax).toBe(0);
    });
  });

  describe('getInstallments', () => {
    it('should calculate monthly installments correctly for a 3-month plan with 0% tax', () => {
      const installmentsDTO: Partial<InstallmentsDTO> = {
        value: 300,
        installments: 3,
        tax: 0.01,
      };
      const installments = service.getInstallments(installmentsDTO);
      expect(installments).toEqual({ 1: 100.17, 2: 100.17, 3: 100.17 });
    });

    it('should calculate monthly installments correctly for a 6-month plan with 5% tax', () => {
      const installmentsDTO: Partial<InstallmentsDTO> = {
        value: 1000,
        installments: 6,
        tax: 0.05,
      };
      const installments = service.getInstallments(installmentsDTO);
      expect(installments).toEqual({
        1: 169.11,
        2: 169.11,
        3: 169.11,
        4: 169.11,
        5: 169.11,
        6: 169.11,
      });
    });

    it('should calculate monthly installments correctly for a 12-month plan with 2.5% tax', () => {
      const installmentsDTO: Partial<InstallmentsDTO> = {
        value: 5000,
        installments: 12,
        tax: 0.025,
      };
      const installments = service.getInstallments(installmentsDTO);
      expect(installments).toEqual({
        1: 422.33,
        2: 422.33,
        3: 422.33,
        4: 422.33,
        5: 422.33,
        6: 422.33,
        7: 422.33,
        8: 422.33,
        9: 422.33,
        10: 422.33,
        11: 422.33,
        12: 422.33,
      });
    });

    it('should return an empty object if no installmentsDTO is provided', () => {
      const installmentsDTO: Partial<InstallmentsDTO> = undefined;
      const installments = service.getInstallments(installmentsDTO);
      expect(installments).toEqual({
        message: 'Need to provide informations to calculate Installments',
      });
    });
  });

  describe('getProductCategoryData', () => {
    it('should return an error message when given invalid input', async () => {
      const installmentsDTO = {
        installments: 6,
      };

      const installmentsData = await service.getProductCategoryData(
        installmentsDTO,
      );

      expect(installmentsData).toBeDefined();
    });

    it('should return an error message when given invalid InstallmentsDTO', async () => {
      const installmentsDTO: Partial<InstallmentsDTO> = {};

      const installmentsData = await service.getProductCategoryData(
        installmentsDTO,
      );

      expect(installmentsData).toEqual({
        message: 'Search a product by name, to calculate installments',
      });
    });
  });
});
