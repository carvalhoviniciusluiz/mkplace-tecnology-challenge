import { EntitySchema }  from 'typeorm';
import { SaleProduct } from '~/domain/entities';

export const SaleProductSchema = new EntitySchema<SaleProduct>({
  name: 'saleProduct',
  tableName: 'sale_products',
  target: SaleProduct,
  columns: {
    id: {
      type: 'uuid',
      primary: true
    },
    product: {
      type: 'uuid',
      name: 'product_id',
    },
    seller: {
      type: 'uuid',
      name: 'seller_id',
    }
  },
  relations: {
    product: {
      type: 'many-to-one',
      target: 'Product',
      joinColumn: {
        name: 'product_id',
        referencedColumnName: 'id',
      },
    },
    seller: {
      type: 'many-to-one',
      target: 'Seller',
      joinColumn: {
        name: 'seller_id',
        referencedColumnName: 'id',
      },
    },
  },
});
