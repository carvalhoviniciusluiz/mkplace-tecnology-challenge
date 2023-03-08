import { SaleProduct } from "../../entities";

export interface InsertSaleProductRepositoryInterface {
  insert(saleProduct: SaleProduct): Promise<void>;
}
