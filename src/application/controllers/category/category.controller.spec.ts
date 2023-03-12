import { CategoryService } from '../../../application/business/category/category.service';
import { CategoryController } from './category.controller';

describe('CategoryController', () => {
  let categoryController: CategoryController;

  beforeEach(() => {
    const categoryService = new CategoryService();
    categoryController = new CategoryController();
  });

  it('should be defined', () => {
    expect(categoryController).toBeDefined();
  });
});
