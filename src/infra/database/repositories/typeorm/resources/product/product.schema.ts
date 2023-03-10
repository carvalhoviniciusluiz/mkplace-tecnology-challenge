import { EntitySchema }  from 'typeorm';
import { Product } from '~/domain/entities';

export const ProductSchema = new EntitySchema<Product>({
  name: 'product',
  tableName: 'products',
  target: Product,
  columns: {
    id: {
      type: 'uuid',
      primary: true
    },
    brand: {
      type: String,
      length: 255
    },
    name: {
      type: String,
      length: 255
    },
    price: {
      type: 'decimal',
      precision: 10,
      scale: 2,
      default: 0
    },
    slug: {
      type: String,
      length: 255
    }
  },
});
