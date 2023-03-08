import type { InsertProductRepositoryInputInterface } from "./inputs/insert-product-repository-input.interface";

export interface InsertProductRepositoryInterface {
  insert(input: InsertProductRepositoryInputInterface): Promise<void>;
}
