import { ProductDTO } from '../../domain/dto/product.dto';
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/utils/base-entity';
import { Category } from './category.entity';

@Entity()
export class Product extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'float' })
  value: number;

  @Column({ type: 'varchar' })
  categoryId: string;

  @ManyToOne(() => Category, category => category.products)
  category: Category;
}
