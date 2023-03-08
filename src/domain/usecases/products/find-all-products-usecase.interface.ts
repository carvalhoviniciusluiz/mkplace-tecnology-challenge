import type { FindAllProductsUseCaseInputInterface } from "./inputs";
import type { FindAllProductsUseCaseOutputInterface } from "./outputs";

export interface FindAllProductsUseCaseInterface {
  execute(input: FindAllProductsUseCaseInputInterface): Promise<FindAllProductsUseCaseOutputInterface[]>
}
