import { EntitySchema } from '@mikro-orm/core';

export const ProductMikroORMSchema = new EntitySchema({
  name: 'Product',
  properties: {
    _id: { primary: true, type: 'string' },
    brand: { type: 'string' },
    name: { type: 'string' },
    price: { type: 'number' },
    slug: { type: 'string' }
  }
});
