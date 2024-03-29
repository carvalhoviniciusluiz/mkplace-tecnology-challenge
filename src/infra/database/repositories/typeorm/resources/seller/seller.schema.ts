import { EntitySchema }  from 'typeorm';
import { Seller } from '~/domain/entities';

export const SellerSchema = new EntitySchema<Seller>({
  name: 'seller',
  tableName: 'sellers',
  target: Seller,
  columns: {
    id: {
      type: 'uuid',
      primary: true
    },
    name: {
      type: String,
      length: 255
    },
    code: {
      type: Number
    }
  },
  relations: {
    products: {
      type: 'many-to-one',
      target: 'Product',
      joinColumn: {
        name: 'product_id',
        referencedColumnName: 'id',
      },
    },
  },
});
