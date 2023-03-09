import { EntitySchema }  from 'typeorm';
import { SaleProduct } from '~/domain/entities';

export const SaleProductSchema = new EntitySchema<SaleProduct>({
  name: 'sale_products',
  tableName: 'sale_products',
  target: SaleProduct,
  columns: {
    id: {
      type: 'uuid',
      primary: true
    },
    product: {
      type: String,
      name: 'product_id',
    },
    seller: {
      type: String,
      name: 'seller_id',
    }
  }
});
