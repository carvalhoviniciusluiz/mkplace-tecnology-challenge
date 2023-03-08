import { Seller } from "../../../../domain/entities";
import { FindOneSellerByCodeRepositoryInterface, InsertSellerRepositoryInterface } from "../../../../domain/repositories/sellers";

export class SellerInMemoryRepository implements InsertSellerRepositoryInterface, FindOneSellerByCodeRepositoryInterface {
  sellers: Seller[] = [];
  async insert(seller: Seller): Promise<void> {
    this.sellers.push(seller);
  }
  async findOneByCode(value: number): Promise<Seller | undefined> {
    return this.sellers.find(seller => seller.code === value);
  }
}
