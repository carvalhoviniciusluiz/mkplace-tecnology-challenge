import { Repository } from "typeorm";
import { SaleProduct } from "~/domain/entities";
import type { InsertSaleProductRepositoryInterface } from "~/domain/repositories/sale-products";
import type { InsertSaleProductRepositoryInputInterface } from "~/domain/repositories/sale-products/inputs";

export class SaleProductTypeOrmRepository implements InsertSaleProductRepositoryInterface {
  constructor(private repository: Repository<SaleProduct>) {}

  async insert(saleProduct: InsertSaleProductRepositoryInputInterface): Promise<void> {
    await this.repository.save(saleProduct as any);
  }
}
