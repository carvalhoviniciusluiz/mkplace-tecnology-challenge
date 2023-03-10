import { DataSource } from "typeorm";
import { ProductSchema, SaleProductSchema, SellerSchema } from "../resources";

export const postgresDataSource = async () => {
  const dataSource = new DataSource({
    type: 'postgres',
    host: '0.0.0.0',
    username: 'postgres',
    password: 'postgres',
    port: 5432,
    database: 'postgres',
    synchronize: true,
    logging: true,
    entities: [ProductSchema, SellerSchema, SaleProductSchema]
  });
  return dataSource.initialize();
}
