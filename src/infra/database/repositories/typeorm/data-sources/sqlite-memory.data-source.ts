import path from "path";
import { DataSource } from "typeorm";
import { ProductSchema, SaleProductSchema, SellerSchema } from "../resources";

export const sqliteMemoryDataSource = () => {
  const dataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
    logging: false,
    entities: [ProductSchema, SellerSchema, SaleProductSchema]
  });
  return dataSource.initialize();
}
