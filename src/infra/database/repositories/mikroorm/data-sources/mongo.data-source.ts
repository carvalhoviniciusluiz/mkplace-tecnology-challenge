import { MikroORM } from '@mikro-orm/mongodb';
import { ProductMikroORMSchema, SaleProductMikroORMSchema, SellerMikroORMSchema } from '../resources';

export const mongoDataSource = async () => {
  return MikroORM.init({
    entities: [SellerMikroORMSchema, ProductMikroORMSchema, SaleProductMikroORMSchema],
    clientUrl: 'mongodb://localhost:27017/mikro-orm-test',
    debug: false
  });
}
