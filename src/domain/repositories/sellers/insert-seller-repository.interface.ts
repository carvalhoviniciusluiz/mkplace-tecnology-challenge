import { Seller } from "../../entities";

export interface InsertSellerRepositoryInterface {
  insert(seller: Seller): Promise<void>;
}
