import { SaleProduct } from "../../../../domain/entities";
import { InsertSaleProductRepositoryInterface } from "../../../../domain/repositories/sale-products";

export class SaleProductInMemoryRepository implements InsertSaleProductRepositoryInterface {
  saleProducts: SaleProduct[] = [];
  async insert(saleProduct: SaleProduct): Promise<void> {
    this.saleProducts.push(saleProduct);
  }
}
