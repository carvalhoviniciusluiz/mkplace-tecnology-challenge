import { InsertSaleProductRepositoryInputInterface } from "./inputs";

export interface InsertSaleProductRepositoryInterface {
  insert(saleProduct: InsertSaleProductRepositoryInputInterface): Promise<void>;
}
