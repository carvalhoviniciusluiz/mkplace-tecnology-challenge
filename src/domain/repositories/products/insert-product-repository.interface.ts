import type { InsertProductRepositoryInputInterface } from "./inputs";

export interface InsertProductRepositoryInterface {
  insert(input: InsertProductRepositoryInputInterface): Promise<void>;
}
