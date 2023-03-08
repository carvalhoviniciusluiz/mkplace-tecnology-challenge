import type { FindAllProductsRepositoryInputInterface } from "./inputs";
import type { FindAllProductsRepositoryOutputInterface } from "./outputs";

export interface FindAllProductsRepositoryInterface {
  findAll(input: FindAllProductsRepositoryInputInterface): Promise<FindAllProductsRepositoryOutputInterface[]>
}
