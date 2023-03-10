import path from "path";
import { DataSource } from "typeorm";
import { ProductSchema, SaleProductSchema, SellerSchema } from "../resources";

export const sqliteDataSource = () => {
  const dataSource = new DataSource({
    type: 'sqlite',
    database: path.join(__dirname, 'database.sqlite'),
    synchronize: true,
    logging: true,
    entities: [ProductSchema, SellerSchema, SaleProductSchema]
  });
  return dataSource.initialize();
}
