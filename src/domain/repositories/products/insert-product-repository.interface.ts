import { Product } from "../../entities";

export interface InsertProductRepositoryInterface {
  insert(product: Product): Promise<void>;
}
