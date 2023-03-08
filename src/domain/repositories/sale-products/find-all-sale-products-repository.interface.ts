import { FindAllSaleProductsRepositoryInputInterface } from "./inputs";
import { FindAllSaleProductsRepositoryOutputInterface } from "./output";

export interface FindAllSaleProductsRepositoryInterface {
  findAll(input: FindAllSaleProductsRepositoryInputInterface): Promise<FindAllSaleProductsRepositoryOutputInterface[]>
}
