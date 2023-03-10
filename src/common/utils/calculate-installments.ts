export function calculateMonthlyInstallment(
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

export function getProductById(products: any, productId: string): Product {
  return products.find((product: any) => product.id === productId);
}

export function getCategoryInterestRate(category: string): any {
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

export function validateProduct(product: Product): boolean {
  return !!product && !!product.value && !!product.category;
}
