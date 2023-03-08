import { FindAllProductsInputInterface } from "./inputs";
import { FindAllProductsOutputInterface } from "./outputs";

export interface FindAllProductsUseCaseInterface {
  execute(input: FindAllProductsInputInterface): Promise<FindAllProductsOutputInterface[]>
}
