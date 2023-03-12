import { EntitySchema } from '@mikro-orm/core';

export const SellerMikroORMSchema = new EntitySchema({
  name: 'Seller',
  properties: {
    _id: { primary: true, type: 'string' },
    code: { type: 'number' },
    name: { type: 'string' },
  },
});
