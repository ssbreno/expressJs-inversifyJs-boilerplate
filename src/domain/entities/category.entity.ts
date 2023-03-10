import { CategoryDTO } from '../../domain/dto/category.dto';
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/utils/base-entity';
import { Product } from './product.entity';

@Entity()
export class Category extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Product, product => product.category, {
    eager: true,
    cascade: true,
  })
  products: Product[];
}
