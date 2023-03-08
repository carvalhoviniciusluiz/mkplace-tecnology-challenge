import type { FindAllSaleProductsUseCaseInputInterface } from "./inputs";
import type { FindAllSaleProductsUseCaseOutputInterface } from "./outputs";

export interface FindAllSaleProductsUseCaseInterface {
  execute(input: FindAllSaleProductsUseCaseInputInterface): Promise<FindAllSaleProductsUseCaseOutputInterface[]>
}
