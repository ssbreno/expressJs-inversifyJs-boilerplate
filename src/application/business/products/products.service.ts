import dataSource from '../../../infrastructure/config/datasource';
import { injectable } from 'inversify';
import {
  ValidationError,
  ValidationErrorPlace,
} from './../../../common/errors/validation.error';
import { Product } from '../../../domain/entities/product.entity';
import { ProductDTO } from '../../../domain/dto/product.dto';
import { CategoryService } from '../category/category.service';

@injectable()
export class ProductService {
  constructor(private readonly categoryService: CategoryService) {}

  private productRepository = dataSource.getRepository(Product);

  public async productExists(
    productDTO: Pick<ProductDTO, 'name'>,
  ): Promise<any> {
    const getProduct = await this.productRepository.findOne({
      where: [
        {
          name: productDTO.name,
        },
      ],
    });

    if (getProduct)
      throw new ValidationError(
        ValidationErrorPlace.Body,
        'Product Already Exists',
      );

    return getProduct;
  }

  public async findProductRelations(name: string): Promise<Product> {
    const getProduct = await this.productRepository.findOne({
      where: {
        name: name,
      },
      relations: {
        category: true,
      },
    });

    if (!getProduct)
      throw new ValidationError(ValidationErrorPlace.Body, 'Product Not Found');

    return getProduct;
  }

  public async findProductById(id: string): Promise<Product> {
    const getProduct = await this.productRepository.findOne({
      where: [
        {
          id: id,
        },
      ],
    });

    if (!getProduct)
      throw new ValidationError(ValidationErrorPlace.Body, 'Product Not Found');

    return getProduct;
  }

  public async deleteProduct(id: string): Promise<any> {
    const findProductName = await this.findProductById(id);
    if (findProductName) {
      return await this.productRepository
        .createQueryBuilder('Product')
        .delete()
        .from(Product)
        .where('id = :id', { id: id })
        .execute();
    }
  }

  public async createProduct(productDTO: ProductDTO): Promise<Product> {
    const findProductName = await this.productExists(productDTO);
    const findCategoryId = await this.categoryService.findCategoryById(
      productDTO.categoryId,
    );
    if (!findProductName && findCategoryId) {
      return await this.productRepository.save(productDTO);
    }
  }

  public async updateProduct(
    productDTO: Partial<ProductDTO>,
  ): Promise<Product> {
    const findProductName = await this.findProductById(productDTO.id);
    if (findProductName) {
      return await this.productRepository.save(productDTO);
    }
  }

  public async getAllProduct(whereArgs: Partial<ProductDTO>): Promise<any> {
    const take = 20;
    const page = whereArgs.page || 1;
    const skip = (page - 1) * take;

    const productQueryBuilder = await this.productRepository.createQueryBuilder(
      'product',
    );

    if (whereArgs.id) {
      productQueryBuilder.andWhere('product.id = :id', {
        id: whereArgs.id,
      });
    }

    if (whereArgs.name) {
      productQueryBuilder.andWhere('product.name = :name', {
        name: whereArgs.name,
      });
    }

    if (whereArgs.description) {
      productQueryBuilder.andWhere('product.description = :description', {
        description: whereArgs.description,
      });
    }

    if (whereArgs.value) {
      productQueryBuilder.andWhere('product.value = :value', {
        value: whereArgs.value,
      });
    }

    if (whereArgs.categoryId) {
      productQueryBuilder.andWhere('product.categoryId = :categoryId', {
        categoryId: whereArgs.categoryId,
      });
    }

    productQueryBuilder.innerJoinAndSelect('product.category', 'category');

    productQueryBuilder.take(take);
    productQueryBuilder.skip(skip);

    const [result, total] = await productQueryBuilder.getManyAndCount();

    return { currentPage: Number(page), total, result };
  }
}
