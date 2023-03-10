import { CategoryDTO } from '../../../domain/dto/category.dto';
import { Category } from '../../../domain/entities/category.entity';
import dataSource from '../../../infrastructure/config/datasource';

const postRepository = dataSource.getRepository(Category);

export const createCategory = async (categoryDTO: CategoryDTO) => {
  return await postRepository.save({
    ...categoryDTO,
  });
};
