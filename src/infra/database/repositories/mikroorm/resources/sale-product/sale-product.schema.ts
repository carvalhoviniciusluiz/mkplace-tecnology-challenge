import { EntitySchema } from '@mikro-orm/core';
import { SaleProductPojo } from '~/domain/entities';

export const SaleProductMikroORMSchema = new EntitySchema<SaleProductPojo>({
  name: 'SaleProduct',
  tableName: 'sale_products',
  properties: {
    _id: { type: 'ObjectId', primary: true },
    externalId: { type: 'string', name: 'external_id' },
    seller: { type: 'Seller', reference: 'embedded' },
    product: { type: 'Product', reference: 'embedded' },
  },
});
