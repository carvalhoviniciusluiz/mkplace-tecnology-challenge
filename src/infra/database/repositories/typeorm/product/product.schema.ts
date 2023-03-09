import { EntitySchema }  from 'typeorm';
import { Product } from '~/domain/entities';

export const ProductSchema = new EntitySchema({
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
      type: Number
    },
    slug: {
      type: String,
      length: 255
    }
  }
});
