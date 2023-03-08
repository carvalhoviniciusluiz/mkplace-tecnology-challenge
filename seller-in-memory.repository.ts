import { Seller } from "./seller.entity";

export interface InsertSellerRepositoryInterface {
  insert(seller: Seller): Promise<void>;
}

export class SellerInMemoryRepository implements InsertSellerRepositoryInterface {
  sellers: Seller[] = [];
  async insert(seller: Seller): Promise<void> {
    this.sellers.push(seller);
  }
}
