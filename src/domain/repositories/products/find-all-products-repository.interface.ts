import { Product } from "../../entities";
import { FindAllProductsRepositoryInputInterface } from "./inputs";

export interface FindAllProductsRepositoryInterface {
  findAll(input: FindAllProductsRepositoryInputInterface): Promise<Product[]>
}
