import { ProductDTO } from '@dto/product.dto';
import { Product } from '../../../domain/entities/product.entity';
import dataSource from '../../../infrastructure/config/datasource';

const postRepository = dataSource.getRepository(Product);

export const createProduct = async (productDTO: Partial<ProductDTO>) => {
  return await postRepository.save({
    active: productDTO.active,
    deliverymanId: productDTO.deliverymanId,
    scheduleTemplateId: productDTO.scheduleTemplateId,
  });
};
