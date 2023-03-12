import { CategoryService } from '../category/category.service';
import { ProductService } from './products.service';

describe('ProductService', () => {
  let productService: ProductService;

  beforeEach(() => {
    const categoryService = new CategoryService();
    productService = new ProductService(categoryService);
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });
});
