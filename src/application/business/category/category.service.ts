import dataSource from '../../../infrastructure/config/datasource';
import { injectable } from 'inversify';
import { CategoryDTO } from '../../../domain/dto/category.dto';
import { Category } from '../../../domain/entities/category.entity';
import {
  ValidationError,
  ValidationErrorPlace,
} from './../../../common/errors/validation.error';

@injectable()
export class CategoryService {
  private categoryRepository = dataSource.getRepository(Category);

  public async findCategoryByName(
    categoryDTO: Pick<CategoryDTO, 'name'>,
  ): Promise<any> {
    const getCategory = await this.categoryRepository.findOne({
      where: [
        {
          name: categoryDTO.name,
        },
      ],
    });

    if (getCategory)
      throw new ValidationError(
        ValidationErrorPlace.Body,
        'Category Already Exists',
      );

    return getCategory;
  }

  public async findCategoryById(id: string): Promise<Category> {
    const getCategory = await this.categoryRepository.findOne({
      where: [
        {
          id: id,
        },
      ],
    });

    if (!getCategory)
      throw new ValidationError(
        ValidationErrorPlace.Body,
        'Category Not Found',
      );

    return getCategory;
  }

  public async deleteCategory(id: string): Promise<any> {
    const findCategoryName = await this.findCategoryById(id);
    if (findCategoryName)
      return await this.categoryRepository
        .createQueryBuilder('category')
        .delete()
        .from(Category)
        .where('id = :id', { id: id })
        .execute();
  }

  public async createCategory(
    categoryDTO: Pick<CategoryDTO, 'name'>,
  ): Promise<Category> {
    const findCategoryName = await this.findCategoryByName(categoryDTO);
    if (!findCategoryName)
      return await this.categoryRepository.save(categoryDTO);
  }

  public async updateCategory(
    categoryDTO: Partial<CategoryDTO>,
  ): Promise<Category> {
    const findCategoryName = await this.findCategoryById(categoryDTO.id);
    if (findCategoryName)
      return await this.categoryRepository.save(categoryDTO);
  }

  public async getAllCategory(whereArgs: Partial<CategoryDTO>): Promise<any> {
    const take = 20;
    const page = whereArgs.page || 1;
    const skip = (page - 1) * take;

    const categoryQueryBuilder =
      await this.categoryRepository.createQueryBuilder('category');

    if (whereArgs.id) {
      categoryQueryBuilder.andWhere('category.id = :id', {
        id: whereArgs.id,
      });
    }

    if (whereArgs.name) {
      categoryQueryBuilder.andWhere('category.name = :name', {
        name: whereArgs.name,
      });
    }

    categoryQueryBuilder.take(take);
    categoryQueryBuilder.skip(skip);

    const [result, total] = await categoryQueryBuilder.getManyAndCount();

    return { currentPage: Number(page), total, result };
  }
}
