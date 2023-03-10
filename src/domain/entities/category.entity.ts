import { CategoryDTO } from '@dto/category.dto';
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/utils/base-entity';
import { Product } from './product.entity';

@Entity()
export class Category extends BaseEntity implements CategoryDTO {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Product, product => product.category)
  products: Product[];
}
