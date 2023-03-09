import type { InsertSellerRepositoryInputInterface } from "./inputs";

export interface InsertSellerRepositoryInterface {
  insert(input: InsertSellerRepositoryInputInterface): Promise<void>;
}
