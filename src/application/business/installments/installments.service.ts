import { ProductDTO } from '../../../domain/dto/product.dto';
import { injectable } from 'inversify';

@injectable()
export class InstallmentsService {
  public calculateMonthlyInstallment(
    price: number,
    interestRate: number,
    numInstallments: number,
  ): number {
    const monthlyInterestRate = interestRate / 12;
    return (
      (price * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numInstallments))
    );
  }

  public getProductById(products: any, productId: string) {
    return products.find((product: any) => product.id === productId);
  }

  public getCategoryInterestRate(category: string): any {
    let juros = 0;
    switch (category.toLowerCase()) {
      case 'informática':
        juros = 0.05;
        break;
      case 'automotivo':
        juros = 0.025;
        break;
      case 'móveis':
        juros = 0.01;
        break;
      default:
        throw new Error('Categoria inválida');
    }

    return juros;
  }

  public validateProduct(product: ProductDTO): boolean {
    return !!product && !!product.value && !!product.categoryId;
  }
}
