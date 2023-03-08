import type { FindAllSaleProductsRepositoryInputInterface } from "./inputs";
import type { FindAllSaleProductsRepositoryOutputInterface } from "./output";

export interface FindAllSaleProductsRepositoryInterface {
  findAll(input: FindAllSaleProductsRepositoryInputInterface): Promise<FindAllSaleProductsRepositoryOutputInterface[]>
}
