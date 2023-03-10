import { SellerInMemoryRepository } from "~/infra/database/repositories/in-memoy";
import { postgresDataSource, sqliteDataSource, sqliteMemoryDataSource } from "~/infra/database/repositories/typeorm";

export const makeDataSource = async (dataSourceType: 'postgres' | 'sqlite' | 'sqlite-memory' | 'memory' = 'memory') => {
  switch (dataSourceType) {
    case 'postgres':
      return postgresDataSource();
    case 'sqlite':
      return sqliteDataSource();
    case 'sqlite-memory':
      return sqliteMemoryDataSource();
    default:
      return new SellerInMemoryRepository();
  }
}
