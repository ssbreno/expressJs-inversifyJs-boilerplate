import { ProductService } from '../../../application/business/products/products.service';
import { ProductController } from './products.controller';
import { CategoryService } from '../../../application/business/category/category.service';

describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductService;
  let categoryService: CategoryService;

  beforeAll(() => {
    categoryService = new CategoryService();
    productService = new ProductService(categoryService);
    controller = new ProductController();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
