import type { InsertSellerRepositoryInputInterface } from "./inputs/insert-seller-repository-input.interface";

export interface InsertSellerRepositoryInterface {
  insert(input: InsertSellerRepositoryInputInterface): Promise<void>;
}
