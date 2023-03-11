import { CategoryDTO } from '../../../domain/dto/category.dto';
import dataSource from '../../../infrastructure/config/datasource';
import { CategoryService } from './category.service';
import { Category } from '../../../domain/entities/category.entity';
import {
  ValidationError,
  ValidationErrorPlace,
} from '../../../common/errors/validation.error';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let categoryRepository: any;

  beforeAll(() => {
    categoryRepository = dataSource.getRepository(Category);
    categoryService = new CategoryService();
  });

  describe('findByNameCategory', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return null when category is not found', async () => {
      const categoryDTO: Pick<CategoryDTO, 'name'> = {
        name: 'non-existing-category',
      };
      const findOneSpy = jest
        .spyOn(categoryRepository, 'findOne')
        .mockResolvedValueOnce(null);

      const result = await categoryService.findCategoryByName(categoryDTO);

      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({
        where: [{ name: categoryDTO.name }],
      });
      expect(result).toBeNull();
    });

    it('should throw a ValidationError when category already exists', async () => {
      const existingCategory = new Category();
      existingCategory.id = '6b348034-48da-4285-8c1b-990a3934873b';
      existingCategory.name = 'existing-category';
      const categoryDTO: Pick<CategoryDTO, 'name'> = {
        name: 'existing-category',
      };
      const findOneSpy = jest
        .spyOn(categoryRepository, 'findOne')
        .mockResolvedValueOnce(existingCategory);

      await expect(
        categoryService.findCategoryByName(categoryDTO),
      ).rejects.toThrowError(
        new ValidationError(
          ValidationErrorPlace.Body,
          'Category Already Exists',
        ),
      );
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({
        where: [{ name: categoryDTO.name }],
      });
    });
  });

  describe('createCategory', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should create a new category when it does not exist', async () => {
      const categoryDTO: Pick<CategoryDTO, 'name'> = {
        name: 'new-category',
      };
      const findByNameCategorySpy = jest
        .spyOn(categoryService, 'findCategoryByName')
        .mockResolvedValueOnce(null);
      const saveSpy = jest
        .spyOn(categoryRepository, 'save')
        .mockResolvedValueOnce(categoryDTO as any);

      const result = await categoryService.createCategory(categoryDTO);

      expect(findByNameCategorySpy).toHaveBeenCalledTimes(1);
      expect(findByNameCategorySpy).toHaveBeenCalledWith(categoryDTO);
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith(categoryDTO);
      expect(result).toEqual(categoryDTO);
    });

    it('should return undefined when category already exists', async () => {
      const existingCategory = new Category();
      existingCategory.id = '6b348034-48da-4285-8c1b-990a3934873b';
      existingCategory.name = 'existing-category';
      const categoryDTO: Pick<CategoryDTO, 'name'> = {
        name: 'existing-category',
      };
      const findByNameCategorySpy = jest
        .spyOn(categoryService, 'findCategoryByName')
        .mockResolvedValueOnce(existingCategory);

      const result = await categoryService.createCategory(categoryDTO);

      expect(findByNameCategorySpy).toHaveBeenCalledTimes(1);
      expect(findByNameCategorySpy).toHaveBeenCalledWith(categoryDTO);
      expect(result).toBeUndefined();
    });
  });

  describe('updateCategory', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should update an existing category', async () => {
      const existingCategory = new Category();
      existingCategory.id = '6b348034-48da-4285-8c1b-990a3934873b';
      existingCategory.name = 'existing-category';
      const categoryDTO: Partial<CategoryDTO> = {
        id: '6b348034-48da-4285-8c1b-990a3934873b',
        name: 'updated-category',
      };
      const findByIdCategorySpy = jest
        .spyOn(categoryService, 'findCategoryById')
        .mockResolvedValueOnce(existingCategory);
      const saveSpy = jest
        .spyOn(categoryRepository, 'save')
        .mockResolvedValueOnce(categoryDTO as any);

      const result = await categoryService.updateCategory(categoryDTO);

      expect(findByIdCategorySpy).toHaveBeenCalledTimes(1);
      expect(findByIdCategorySpy).toHaveBeenCalledWith(categoryDTO.id);
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith(categoryDTO);
      expect(result).toEqual(categoryDTO);
    });

    it('should return null when category does not exist', async () => {
      const categoryDTO: Partial<CategoryDTO> = {
        id: '6b348034-48da-4285-8c1b-990a3934873b',
        name: 'non-existing-category',
      };
      const findByIdCategorySpy = jest
        .spyOn(categoryService, 'findCategoryById')
        .mockResolvedValueOnce(null);

      const result = await categoryService.updateCategory(categoryDTO);

      expect(findByIdCategorySpy).toHaveBeenCalledTimes(1);
      expect(findByIdCategorySpy).toHaveBeenCalledWith(categoryDTO.id);
      expect(result).toBeUndefined();
    });
  });

  describe('findByIdCategory', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return a category when a valid ID is provided', async () => {
      const category = new Category();
      category.id = '6b348034-48da-4285-8c1b-990a3934873b';
      const findOneSpy = jest
        .spyOn(categoryRepository, 'findOne')
        .mockResolvedValueOnce(category);

      const result = await categoryService.findCategoryById(category.id);

      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({
        where: [{ id: category.id }],
      });
      expect(result).toEqual(category);
    });

    it('should throw a ValidationError when an invalid ID is provided', async () => {
      const invalidId = 'invalid-id';
      const findOneSpy = jest
        .spyOn(categoryRepository, 'findOne')
        .mockResolvedValueOnce(null);

      await expect(categoryService.findCategoryById(invalidId)).rejects.toThrow(
        'HTTP 400 status',
      );
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({
        where: [{ id: invalidId }],
      });
    });
  });

  //need to be revised
  describe('deleteCategory', () => {
    const id = '6b348034-48da-4285-8c1b-990a3934873b';

    it('should throw an error if category is not found', async () => {
      const findOneSpy = jest
        .spyOn(categoryService, 'findCategoryById')
        .mockResolvedValueOnce(null);

      const result = await categoryService.deleteCategory(id);

      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith(id);
      expect(result).toBeUndefined();
    });

    it('should delete the category successfully', async () => {
      const id = '6b348034-48da-4285-8c1b-990a3934873b';
      const findOneSpy = jest
        .spyOn(categoryService, 'findCategoryById')
        .mockResolvedValueOnce(null);
      const result = await categoryService.deleteCategory(id);

      expect(findOneSpy).toHaveBeenCalledTimes(2);
      expect(findOneSpy).toHaveBeenCalledWith(id);
      expect(result).toBeUndefined();
    });
  });
});
