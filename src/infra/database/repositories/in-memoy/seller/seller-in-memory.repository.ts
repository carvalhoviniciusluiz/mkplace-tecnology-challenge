import type { FindOneSellerByCodeRepositoryInterface, InsertSellerRepositoryInterface } from "~/domain/repositories/sellers";
import type { InsertSellerRepositoryInputInterface } from "~/domain/repositories/sellers/inputs";
import type { FindOneSellerByCodeRepositoryOutputInterface } from "~/domain/repositories/sellers/outputs";

interface SellersDataInterface {
  id: string;
  name: string;
  code: number;
}

export class SellerInMemoryRepository implements InsertSellerRepositoryInterface, FindOneSellerByCodeRepositoryInterface {
  sellers: SellersDataInterface[] = [];
  async insert(input: InsertSellerRepositoryInputInterface): Promise<void> {
    this.sellers.push(input);
  }
  async findOneByCode(value: number): Promise<FindOneSellerByCodeRepositoryOutputInterface | undefined> {
    return this.sellers.find(seller => seller.code === value);
  }
}
