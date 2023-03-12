import { injectable } from 'inversify';
import { InstallmentsDTO } from '../../../domain/dto/installments.dto';
import { ProductService } from '../products/products.service';

@injectable()
export class InstallmentsService {
  constructor(private readonly productService: ProductService) {}

  public getTaxCategory(category: string): number {
    switch (category.toLowerCase()) {
      case 'informática':
        return 5 / 100;
      case 'automotivo':
        return 2.5 / 100;
      case 'móveis':
        return 1 / 100;
      default:
        return 0;
    }
  }

  public getInstallments(installmentsDTO: Partial<InstallmentsDTO>) {
    if (!installmentsDTO) {
      return {
        message: 'Need to provide informations to calculate Installments',
      };
    }
    const monthlyInterestRate = installmentsDTO.tax / 12;
    const monthlyInstallments =
      (installmentsDTO.value * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -installmentsDTO.installments));
    const installmentsObject = {};
    for (let i = 1; i <= installmentsDTO.installments; i++) {
      installmentsObject[i] = Math.round(monthlyInstallments * 100) / 100;
    }
    return installmentsObject;
  }

  public async getProductCategoryData(
    installmentsDTO: Partial<InstallmentsDTO>,
  ) {
    let findProducts;
    if (installmentsDTO.name) {
      findProducts = await this.productService.findProductRelations(
        installmentsDTO.name,
      );
      const tax = this.getTaxCategory(findProducts.category.name);
      installmentsDTO.tax = tax;
      installmentsDTO.value = findProducts.value;
      const getInstallments = this.getInstallments(installmentsDTO);
      const installments = {};
      Object.keys(getInstallments).forEach(key => {
        installments[key] = getInstallments[key];
      });
      const installmentsValue: any = Object.values(getInstallments).reduce(
        (installments: number, currentValue: number) =>
          installments + currentValue,
        0,
      );
      const formatInstallments = Math.round(installmentsValue * 100) / 100;
      return {
        noTaxValue: findProducts.value,
        formatInstallments,
        tax,
        installments,
      };
    }

    return { message: 'Search a product by name, to calculate installments' };
  }
}
