import type { CreateSaleProductUseCaseInputInterface } from "./inputs";
import type { CreateSaleProductUseCaseOutputInterface } from "./outputs";

export interface CreateSaleProductUseCaseInterface {
  execute(input: CreateSaleProductUseCaseInputInterface): Promise<CreateSaleProductUseCaseOutputInterface>;
}
