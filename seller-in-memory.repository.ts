import { Seller } from "./seller.entity";

export interface InsertSellerRepositoryInterface {
  insert(seller: Seller): Promise<void>;
}
export interface FindOneSellerByCodeRepositoryInterface {
  findOneByCode(value: number): Promise<Seller | undefined>;
}

export class SellerInMemoryRepository implements InsertSellerRepositoryInterface, FindOneSellerByCodeRepositoryInterface {
  sellers: Seller[] = [];
  async insert(seller: Seller): Promise<void> {
    this.sellers.push(seller);
  }
  async findOneByCode(value: number): Promise<Seller | undefined> {
    return this.sellers.find(seller => seller.code === value);
  }
}
